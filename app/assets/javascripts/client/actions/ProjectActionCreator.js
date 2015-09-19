var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var WebAPIUtils = require('../utils/WebAPIUtils');

var ProjectActionCreator = {

  getAllProjects : function( ){
    AppDispatcher.dispatch ({
      type : ActionTypes.PROJECTS_FETCH,
    });
    WebAPIUtils.getAllProjects();
  }, 

  createProject : function( payload ){
    AppDispatcher.dispatch({
      type : ActionTypes.PROJECTS_CREATE
    });
    WebAPIUtils.createProject( payload.name, payload.contentAttributesType );
  },

  getProject : function( payload ){
    WebAPIUtils.getProject( payload.id );
  },

  playProject : function( payload ){
    AppDispatcher.dispatch({
      type : ActionTypes.PROJECT_PLAY,
      id   : payload.id
    });
  },

  uploadAttachment : function( payload ){
    AppDispatcher.dispatch({
      type : ActionTypes.UPLOAD_ATTACHMENT,
      file   : payload.file,
    });
    WebAPIUtils.uploadFile( payload.file );
  },


};

module.exports = ProjectActionCreator;
