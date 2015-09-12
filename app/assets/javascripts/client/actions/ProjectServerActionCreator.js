var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ProjectServerActionCreator = {
  receiveProjects : function( projects ){
      AppDispatcher.dispatch ({
        type : ActionTypes.PROJECT_RECEIVE,
        projects : projects
      });
  }, 


};

module.exports = ProjectServerActionCreator;
