var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var _projects = [];
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

var ProjectListStore = Object.assign({}, EventEmitter.prototype, {
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

  removeProject : function( project ) {
    for( var i = 0; i < _projects.length; i++ ){
      if( _projects[i].id == project.id ){
        _projects.splice(i,1);
        this.emitChange();
        return;
      }
    }
  },

  addChangeListener: function(callback) {
    this.on(EventTypes.PROJECT_LIST_CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.PROJECT_LIST_CHANGE, callback);
  },
});

ProjectListStore.dispatchToken = AppDispatcher.register(function( action ){
  switch(action.type){
   case ActionTypes.PROJECTS_RECEIVE: 
      ProjectListStore.setProjects(action.projects);
      break;
   case ActionTypes.DELETE_PROJECT_SUCCESS: 
      ProjectListStore.removeProject(action.project);
      break;
    default : 
      break;
  };

});

ProjectListStore.init();
module.exports = ProjectListStore;
