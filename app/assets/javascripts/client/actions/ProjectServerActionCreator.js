var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ProjectServerActionCreator = {
  receiveProjects : function( projects ){
      AppDispatcher.dispatch ({
        type : ActionTypes.PROJECT_RECEIVE,
        projects : projects
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
