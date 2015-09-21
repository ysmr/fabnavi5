var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');
var Camera = require('../player/Camera');
var ImageConverter = require('../player/ImageConverter');
var CalibrateController = require('../player/CalibrateController');

var _project = null;
var _current_page = 0;
var keyMap = [];


var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    Camera.init();
    keyMap[13] = ProjectStore.shoot;
    keyMap[39] = ProjectStore.next;
    keyMap[37] = ProjectStore.prev;

    var d = 5;
    keyMap[65] = CalibrateController.changeRegionCB(-d,0);
    keyMap[68] = CalibrateController.changeRegionCB(d,0);
    keyMap[83] = CalibrateController.changeRegionCB(0,-d);
    keyMap[87] = CalibrateController.changeRegionCB(0,d);

    keyMap[72] = CalibrateController.moveRegionCB(-d,0);
    keyMap[70] = CalibrateController.moveRegionCB(d,0);
    keyMap[84] = CalibrateController.moveRegionCB(0,-d);
    keyMap[71] = CalibrateController.moveRegionCB(0,d);

    this.emitChange();
  },

  shoot : function(){
    console.log("shoot");
    Camera.shoot().then(function(url){
      var fig = ProjectStore.newFigure();
      ProjectStore.setImageToFigureFromCamera(fig, url);
      ProjectStore.pushFigure( fig );
      fig.figure.clientContent.dfdImage
        .then(ImageConverter.toBlob)
        .then(function(blob){
          if( url.length > 1000 ){ 
            url = url.slice(30,40) + ".jpg";
          }
          ProjectActionCreator.uploadAttachment({
            file : blob,
            name : url.replace(/\?.*/,"").replace(/^.*\//,""),
            sym : fig.figure.sym
          });
        });
    });
  },

  next : function(){
    _current_page++;
    if( _current_page <= _project.content.length ) {
        _current_page = _project.content.length -1 ;
    }
    ProjectStore.emitChange();
  },

  prev : function(){
    _current_page--;
    if( _current_page < 0 ) {
        _current_page = 0;
    }
    ProjectStore.emitChange();
  },

  setProject : function( project ){
    _project = project;
    this.emitChange();
  },

  pushFigure : function( fig ){
    _project.content.push(fig);
    ProjectStore.emitChange();
  },

  mergeUploadedFigure : function( fig ){
    var dst = ProjectStore.findFigureBySymbol( fig.sym );
    dst.figure.id = fig.id;
    dst.figure.file = fig.file;
    ProjectStore.saveProject();
    ProjectStore.emitChange();
  },

  saveProject : function(){
    setTimeout(function(){
      ProjectActionCreator.updateProject({
        project :  ProjectStore.getProject() 
      });
    },0);
  },

  newFigure : function( ){
    return {
      figure : {
        sym           : gensym(),
        clientContent : {
          dfdImage      : null,
          dfdThumbnail  : null,
        },
        serverContent : {
          dfdImage      : null,
          dfdThumbnail  : null,
        },
        file : {
          id : null,
          file : {
            url : null,
            thumb : {
              url : null
            },
          },
        },
        position : 7,
      }
    };
  },

  setImageToFigureFromCamera : function( fig, url ){
   var src = null;
    if( url ){
      src = url;
      fig.figure.file.file.url = url;
    } else if( fig.figure.file.file.url ) {
      src = fig.figure.file.file.url;
    } else {
      throw new Error("Figure url is not sed");
    }

    var img = new Image();
    var d = $.Deferred();
    img.src = src;
    img.crossOrigin='anonymous';
    img.onload = function(){
      d.resolve(img);
    }
    fig.figure.clientContent.dfdImage = d.promise();
  },

  setImageToFigureFromServer : function( fig, url ){

  },

  setThumbnailToFigureFromServer : function( fig, url ){

  },


  emitChange : function(){
    this.emit(EventTypes.PROJECT_CHANGE);
  },

  emitUpdateCanvas : function(){
    this.emit(EventTypes.UPDATE_CANVAS_REQUEST);
  },

  getProject : function( ){
    return _project;
  },

  getCurrentPage: function(){
    return _current_page;
  },

  addChangeListener: function(callback) {
    this.on(EventTypes.PROJECT_CHANGE, callback);
  },

  addCanvasRequestListener: function(callback) {
    this.on(EventTypes.UPDATE_CANVAS_REQUEST, callback);
  },

  removeCanvasRequestListener: function(callback) {
    this.on(EventTypes.UPDATE_CANVAS_REQUEST, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.PROJECT_CHANGE, callback);
  },


  findFigureBySymbol : function( sym ){
     var cts  = ProjectStore.getProject().content;
     var fig = null;
     for(var i = 0; i < cts.length; i++){
        fig = cts[i];
        if( fig.figure.hasOwnProperty('sym') && fig.figure.sym == sym ) return fig;
     } 
  },
});

ProjectStore.dispatchToken = AppDispatcher.register(function( action ){
  switch(action.type){
    case ActionTypes.KEY_DOWN:
      if( keyMap.hasOwnProperty( action.keyCode ) ){
        console.log(action);
          keyMap[action.keyCode]();
      }  
      break;
    case ActionTypes.PROJECT_RECEIVE: 
      ProjectStore.setProject( action.project );
      break;
    case ActionTypes.UPDATE_CANVAS :
      ProjectStore.emitUpdateCanvas();
      break;
    case ActionTypes.PROJECT_PLAY: 
      location.hash = "#/project/play/" + action.id;
      ProjectActionCreator.getProject({ id:action.id });
      break;
    case ActionTypes.UPLOAD_ATTACHMENT_SUCCESS :
      ProjectStore.mergeUploadedFigure( action.result );
      ProjectStore.findFigureBySymbol(action.result.sym);
      break;
    default : 
      break;
  };

});

global.ProjectStore = ProjectStore;
module.exports = ProjectStore;
