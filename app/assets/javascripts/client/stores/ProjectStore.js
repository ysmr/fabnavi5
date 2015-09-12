var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var _projects = [];
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _projects = [];
    ProjectActionCreator.getAllProjects();
    this.emitChange();
  },

  getProjectsAll : function (){
    return _projects;
  },

  emitChange : function(){
    this.emit(EventTypes.PROJECT_LIST_CHANGE);
  },

  setProjects : function( projects ){
    _projects = projects;
    this.emitChange();
  },

  addChangeListener: function(callback) {
    this.on(EventTypes.PROJECT_LIST_CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.PROJECT_LIST_CHANGE, callback);
  },
});

ProjectStore.dispatchToken = AppDispatcher.register(function( action ){
  switch(action.type){
   case ActionTypes.PROJECT_RECEIVE: 
      ProjectStore.setProjects(action.projects);
      break;
    default : 
      break;
  };

});

ProjectStore.init();
module.exports = ProjectStore;
