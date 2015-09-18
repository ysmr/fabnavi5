var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');
var Camera = require('../player/Camera');

var _project = null;
var _current_page = 0;
var keyMap = [];


var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    Camera.init();
    keyMap[13] = this.shoot;
    this.emitChange();
  },

  shoot : function(){
    console.log("shoot");
    Camera.shoot().then(function(url){
      console.log(url);
      ProjectStore.pushPhotoFromCamera( url );
    });
  },

  setProject : function( project ){
    _project = project;
    this.emitChange();
  },

  pushPhotoFromCamera : function( url ){
    var imgDeferred = $.Deferred();
    var img = new Image();
    img.src = url;
    img.onload = function(img){
      imgDeferred.resolve(img);
    };
    
    var content = {
      figure : {
        privateContent :{
          img_promise : imgDeferred.promise(),
          thumb_promise : null,
          img : null,
          thumb : null,
        },
        file : {
          file : {
            url : url,
            thumb : {
              url : null
            },
          },
        },
        id : null,
        position : -1,
      }
    };
    _project.content.push( content );
    ProjectStore.emitChange();
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
