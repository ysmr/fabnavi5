var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

var _project = null;
var _current_page = 0;

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    this.emitChange();
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

  setProject : function( project ){
    _project = project;
    this.emitChange();
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

ProjectStore.init();
global.ProjectStore = ProjectStore;
module.exports = ProjectStore;
