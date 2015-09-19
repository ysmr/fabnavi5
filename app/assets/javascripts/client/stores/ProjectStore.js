var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');
var Camera = require('../player/Camera');
var ImageConverter = require('../player/ImageConverter');

var _project = null;
var _current_page = 0;
var keyMap = [];


var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    Camera.init();
    keyMap[13] = ProjectStore.shoot;
    keyMap[39] = ProjectStore.next;
    keyMap[37] = ProjectStore.prev;
    this.emitChange();
  },

  shoot : function(){
    console.log("shoot");
    Camera.shoot().then(function(url){
      console.log(url);
      var fig = ProjectStore.newFigure();
      ProjectStore.setImageToFigureFromCamera(fig, url);
      ProjectStore.pushFigure( fig );
      console.log("pushed :" ,fig);
      fig.figure.clientContent.dfdImage
        .then(ImageConverter.toBlob)
        .then(function(blob){
          console.log("blob created:" ,blob);
          console.log(blob);
          if( url.length > 1000 ){ url = url.slice(30,40) + ".jpg";
          }
          ProjectActionCreator.uploadAttachment({
            file : blob,
            name : url.replace(/\?.*/,"").replace(/^.*\//,"")
          });
        });
    });
  },

  next : function(){
    _current_page++;
    if( _project.content.length >= _current_page ) {
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

  newFigure : function( ){
    return {
      figure : {
        clientContent : {
          dfdImage      : null,
          dfdThumbnail  : null,
        },
        serverContent : {
          dfdImage      : null,
          dfdThumbnail  : null,
        },
        file : {
          file : {
            url : null,
            thumb : {
              url : null
            },
          },
        },
        id : null,
        position : -1,
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

  getProject : function( ){
    return _project;
  },

  getCurrentPage: function(){
    return _current_page;
  },

  addChangeListener: function(callback) {
    this.on(EventTypes.PROJECT_CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.PROJECT_CHANGE, callback);
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
    case ActionTypes.PROJECT_PLAY: 
      location.hash = "#/project/play/" + action.id;
      ProjectActionCreator.getProject({ id:action.id });
      break;
    default : 
      break;
  };

});

global.ProjectStore = ProjectStore;
module.exports = ProjectStore;
