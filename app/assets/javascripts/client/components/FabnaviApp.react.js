var React = require('react');
var Navigation = require('./Navigation.react');
var SearchBar = require('./SearchBar.react');
var ProjectList = require('./ProjectList.react');
var ProjectManager = require('./ProjectManager.react');
var Player = require('./Player.react.js');
var Frame = require('./Frame.react.js');
var Footer = require('./Footer.react.js');
var CreateProject = require('./CreateProject.react.js');
var EditProject = require('./EditProject.react.js');
var ProjectDetail = require('./ProjectDetail.react.js');
var ProjectList = require('./ProjectList.react.js');
var ProjectStore = require('../stores/ProjectStore');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ServerActionCreator = require('../actions/ServerActionCreator');

var jade = require('react-jade');

var Router = require('react-router'); 
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  React.createElement(Route, {handler: Frame, path: "/"}, 
    React.createElement(Route, {handler: ProjectManager, name: "manager"},
      React.createElement(Route, {handler: ProjectList, name: "index"}),
      React.createElement(Route, {handler: CreateProject, name: "create"}),
      React.createElement(Route, {handler: EditProject, name: "edit", path: "edit/:projectId"}),
      React.createElement(Route, {handler: ProjectDetail, name: "project", path:"project/:projectId"}),
      React.createElement(DefaultRoute,   { handler: ProjectList }),
      React.createElement(NotFoundRoute,  { handler: ProjectList })
    ),
    React.createElement(Route, {handler: Player, name: "player", path:"project/play/:projectId"}),
    React.createElement(Redirect, {from: "/", to:"/manager"}),
    React.createElement(NotFoundRoute, { handler: ProjectManager })
  )
);

global.onload = function ( ) {
  console.log("Fabnavi boot");
  ProjectStore.init();
  Router.run(routes, function(Handler){
    React.render(React.createElement(Handler, null), document.body);
  });

  var url = window.location.href;
  if(url.contains("uid") && url.contains("client_id") && url.contains("auth_token")){
    var token = url.match(/auth_token=([a-zA-Z0-9\-]*)/)[1];
    var uid = url.match(/uid=([a-zA-Z0-9\-]*)/)[1];
    var client_id = url.match(/client_id=([a-zA-Z0-9\-]*)/)[1];
    WebAPIUtils.signedIn(token,uid,client_id);
    window.location.href = window.location.href.split("/")[0] + "/#manager";
  }
  if(WebAPIUtils.isSigningIn()){
    ServerActionCreator.signIn();
  }

}
