var ProjectServerActionCreator = require('../actions/ProjectServerActionCreator');
var $ = require('jquery');

var WebAPIUtils = {
  getAllProjects : function( page, per_page, offset ){
    console.log("getProjects");
    page = page || 0;
    per_page = per_page || 20;
    offset = offset || 0;
    $.ajax({
      dataType : "json",
      data : {
        page : page,
        per_page : per_page,
        offset : offset
      },
      type : "GET",
      success : function(res){
        ProjectServerActionCreator.receiveProjects( res );
      },
      error : function(err){
        console.log("Error from getAllProjects");
        console.log(err);
      },
      url : "/api/v1/projects.json"

    });
  },

  createProject : function( name, content_attributes_type ){
    console.log("createProject");
    
  },

  updateProject : function( name, 
                            description, 
                            tag_list, 
                            attachment_id, 
                            lisence_id){
    console.log("updateProject");
  },                            
                             
  deleteProject : function( id ){
    console.log("deleteProject");
  },

  likeProject : function( id ){
    console.log("likeProject");
  },

  unlikeProject : function( id ){
    console.log("unlikeProject");
  },

  likeFigure : function( project_id, figure_id ){
    console.log("likeFigure");
  },

  unlikeFigure : function( project_id, figure_id ){
    console.log("unlikeFigure");
  },

  getCalibrations : function( page, per_page, offset ){
    console.log("getCalibrations");
  },

  createCalibration : function( name, x, y, width, height ){
    console.log("createCalibrations");
  },

  updateCalibration: function( name, x, y, width, height ){
    console.log("updateCalibrations");
  },

  deleteCalibration : function( id ){
    console.log("deleteCalibrations");
  },

  uploadFile : function( file ){
    console.log("uploadFile");
  }
};


module.exports = WebAPIUtils;
