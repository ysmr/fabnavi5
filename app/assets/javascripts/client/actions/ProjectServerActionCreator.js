var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ProjectServerActionCreator = {
  receiveProjects : function( projects ){
      AppDispatcher.dispatch ({
        type : ActionTypes.PROJECTS_RECEIVE,
        projects : projects
      });
  }, 

  receiveProject : function( project ){
      AppDispatcher.dispatch ({
        type : ActionTypes.PROJECT_RECEIVE,
        project : project
      });
  }, 

  createProjectSuccess : function( result ){
      AppDispatcher.dispatch ({
        type : ActionTypes.PROJECT_CREATE_SUCCESS,
        result : result,
      });
  }, 


};

module.exports = ProjectServerActionCreator;
