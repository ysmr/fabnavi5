var ProjectServerActionCreator = require('../actions/ProjectServerActionCreator');
var ServerActionCreator = require('../actions/ServerActionCreator');
var $ = require('jquery');
var _accessToken = null;
var _client = null;
var _uid = null;

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
    if( _client == null || _uid == null || _accessToken == null) throw new Error("Not Authorized");
    
    $.ajax({
      dataType : "json",
      data : {
        project : {
          name : name,
          content_attributes : {
           type : "Content::PhotoList"
          } 
        }
      },
      headers : {
        "Client"        : _client,
        "Uid"           : _uid,
        "Access-Token"  : _accessToken
      },
      type : "post",
      success : function(res){
        ProjectServerActionCreator.receiveProjects( res );
      },
      error : function(err){
        console.log("Error from Create Project");
        console.log(err);
      },
      url : "/api/v1/projects.json"

    });
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
  }, 

  signIn : function(){
    WebAPIUtils.initPersona();
    navigator.id.request();
  },

  signOut : function () {
    WebAPIUtils.initPersona();
    navigator.id.logout();
  },

  initPersona : function () {
    navigator.id.watch({
       onlogin: function(assertion){
          $.ajax({
              type:"POST",
              url:"/api/v1/auth/sign_in",
              data:{assertion:assertion},
              dataType:"json",
              success: function(res, status, xhr){
                _accessToken = xhr.getResponseHeader("Access-Token");
                _uid = xhr.getResponseHeader("Uid");
                _client = xhr.getResponseHeader("Client");
                ServerActionCreator.signIn(res.email);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        },
        onlogout: function(){
          $.ajax({
              type:"DELETE",
              url:"/api/v1/auth/sign_out",
                success: function(res, status, xhr){
                  ServerActionCreator.signOut(res);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
              }
          });
        }
    });  
  } 
};


global.api = WebAPIUtils;
module.exports = WebAPIUtils;
