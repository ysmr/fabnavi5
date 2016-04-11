var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var _projects = [];
var init_projects = [];
var search_projects = [];
var empty_projects = [];
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

  initProjects : function(projects){
    init_projects = projects;
    console.log("init : " +init_projects.length);
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

  searchProject : function( search_text ){
    search_projects = [];
    var re = new RegExp(search_text,'i');
    if(search_text === ""){
      _project = init_projects;
    }else{
      for(var i = 0; i < init_projects.length; i++){
        if(re.test(init_projects[i].name) ==true){
          search_projects.push(init_projects[i]);
          _project = search_projects;
        }else{
          _project = [];
        }
      }
    }
    this.setProjects(_project);
    return;
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
      ProjectListStore.initProjects(action.projects);
      break;
   case ActionTypes.PROJECT_DELETE_SUCCESS:
      ProjectListStore.removeProject(action.project);
      break;
   case ActionTypes.PROJECT_SEARCH:
      ProjectListStore.searchProject(action.text);
    default :
      break;
  };

});

ProjectListStore.init();
module.exports = ProjectListStore;
