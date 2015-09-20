var ProjectServerActionCreator = require('../actions/ProjectServerActionCreator');
var ServerActionCreator = require('../actions/ServerActionCreator');
var $ = require('jquery');
var _accessToken = null;
var _client = null;
var _uid = null;
var DEVELOPMENT = true;

function setHeader(client,uid,accessToken){
    localStorage.setItem("header",{
      "Client"        : _client,
      "Uid"           : _uid,
      "AccessToken"  : _accessToken
    }.toSource());
}

function clearHeader(){
  localStorage.removeItem("header");
}

function loadHeader(){
  var header = localStorage.getItem("header");
  if( header == null || !DEVELOPMENT){
    return null;
  } else {
    header = eval(header);
    _client = header.Client;
    _uid = header.Uid;
    _accessToken = header.AccessToken;
    setTimeout(function(){
    ServerActionCreator.signIn(_uid);
    },0);
    return header;
  }
}

function genHeader(){
  loadHeader();
  if( _client == null || _uid == null || _accessToken == null){
    return {
    };

  } else {
    return {
      "Client"        : _client,
      "Uid"           : _uid,
      "Access-Token"  : _accessToken
    };
  }
}

var WebAPIUtils = {

  getProject : function( id ){
    console.log("getProject : ",id);
    $.ajax({
      dataType : "json",
      type : "GET",
      success : function(res){
        ProjectServerActionCreator.receiveProject( res );
      },
      error : function(err){
        console.log("Error from getProject");
        console.log(err);
      },
      headers : genHeader(),
      url : "/api/v1/projects/" + id +".json"

    });
  },

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

  createProject : function( name, contentAttributesType ){
    console.log("createProject");
    
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
      headers : genHeader(),
      type : "post",
      success : function(res){
        ProjectServerActionCreator.createProjectSuccess( res );
      },
      error : function(err){
        console.log("Error from Create Project");
        console.log(err);
      },
      url : "/api/v1/projects.json"

    });
  },

  updateProject : function( project ){
    console.log("updateProject");

    console.log(project);

    var figures_attributes = [];
    
    for( var figure of project.content ){
      figures_attributes.push({
        type : "Figure::Photo",
        _destroy : false,
        attachment_id : figure.figure.id,
        id : figure.figure.id,
        position : figure.figure.position,
      });
    }
      var data = {
        project : {
          id : project.id,
          name : project.name,
          description : project.description,
          tag_list : "",
          lisence_id: 0,
          content_attributes : {
            attachment_id : figures_attributes[0].attachment_id,
            description : project.description,
            type : "Content::PhotoList",
            figures_attributes : figures_attributes,
          } ,
        }
      };
      console.log(data.toSource());

    $.ajax({
      dataType : "json",
      headers : genHeader(),
      type : "patch",
      data : data,
      success : function(res){
        console.log("upload success: ",res);
        //ProjectServerActionCreator.createProjectSuccess( res );
      },
      error : function(err){
        console.log("Error from UpdateProject");
        console.log(err);
      },
      url : "/api/v1/projects/"+ project.id + ".json"

    });
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

  uploadFile : function( file, name, sym ){
    console.log("uploadFile");

    var fd = new FormData();
    fd.append("attachment[file]",file, name);
    
    $.ajax({
      dataType : "json",
      data : fd,
      processData: false, 
      contentType: false,
      headers : genHeader(),
      type : "post",
      success : function(res){
        console.log("Uploaded file");
        console.log( res );
        res.sym = sym;
        ProjectServerActionCreator.uploadAttachmentSuccess( res );
      },
      error : function(err){
        console.log("Error from Upload File :sym", sym);
        console.log(err);
      },
      url : "/api/v1/attachments.json"

    });
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
                setHeader();
                ServerActionCreator.signIn(res.email);
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
                clearHeader();
              }
          });
        },
        onlogout: function(){
          $.ajax({
              type:"DELETE",
              url:"/api/v1/auth/sign_out",
                success: function(res, status, xhr){
                  ServerActionCreator.signOut(res);
                  clearHeader();
              },
              error: function(res, status, xhr){
                console.log(res,status,xhr);
                clearHeader();
              }
          });
        }
    });  
  } 
};


global.api = WebAPIUtils;
module.exports = WebAPIUtils;