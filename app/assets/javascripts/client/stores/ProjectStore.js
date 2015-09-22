var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var KeyActionTypes = require('../constants/KeyActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');
var Camera = require('../player/Camera');
var ImageConverter = require('../player/ImageConverter');
var CalibrateController = require('../player/CalibrateController');

var _project = null;
var _current_page = 0;

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    Camera.init();
    this.emitChange();
  },

  shoot : function(){
    console.log("shoot");
    ProjectStore.emitClearCanvas();
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
    ProjectStore.setPage(_current_page + 1);
  },

  prev : function(){
    ProjectStore.setPage(_current_page - 1);
  },

  setPage : function( page ){

    if( ! _project.hasOwnProperty("content") ) {
      console.log("Project not set");
      return ;
    }
    if( page >= _project.content.length ) {
      page = _project.content.length -1 ;
    }

    if( page < 0 ) {
      page = 0;
    }

    _current_page = page;
    console.log("page : ",page);
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

  emitClearCanvas : function(){
    this.emit(EventTypes.CLEAR_CANVAS_REQUEST);
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

  addCanvasClearListener: function(callback) {
    this.addListener(EventTypes.CLEAR_CANVAS_REQUEST, callback);
  },

  removeCanvasRequestListener: function(callback) {
    this.on(EventTypes.UPDATE_CANVAS_REQUEST, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.PROJECT_CHANGE, callback);
  },

  removeCanvasClearListener: function(callback) {
    this.removeListener(EventTypes.CLEAR_CANVAS_REQUEST, callback);
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
 var d = 10;
  switch(action.type){
    case KeyActionTypes.CALIBRATE_LONGER_HORIZONTAL:
      CalibrateController.changeRegionCB(-d,0)();
      break;
    case KeyActionTypes.CALIBRATE_SHORTER_HORIZONTAL:
      CalibrateController.changeRegionCB(d,0)();
      break;
    case KeyActionTypes.CALIBRATE_LONGER_VERTICAL:
      CalibrateController.changeRegionCB(0,d)();
      break;
    case KeyActionTypes.CALIBRATE_SHORTER_VERTICAL:
      CalibrateController.changeRegionCB(0,-d)();
      break;

    case KeyActionTypes.CALIBRATE_MOVE_RIGHT:
      CalibrateController.moveRegionCB(d,0)();
      break;
    case KeyActionTypes.CALIBRATE_MOVE_LEFT:
      CalibrateController.moveRegionCB(-d,0)();
      break;
    case KeyActionTypes.CALIBRATE_MOVE_DOWN:
      CalibrateController.moveRegionCB(0,d)();
      break;
    case KeyActionTypes.CALIBRATE_MOVE_UP:
      CalibrateController.moveRegionCB(0,-d)();
      break;

    case KeyActionTypes.PROJECT_SHOOT:
      ProjectStore.shoot();
      break
    case KeyActionTypes.PROJECT_NEXT_PAGE:
      ProjectStore.next();
      break
    case KeyActionTypes.PROJECT_PREV_PAGE:
      ProjectStore.prev();
      break

    case KeyActionTypes.EXIT_PROJECT:
      location.hash = "#/manager";
      break

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
