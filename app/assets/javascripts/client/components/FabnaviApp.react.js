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

var jade = require('react-jade');

var Router = require('react-router'); 
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var routes = (
    React.createElement(Route, {handler: Frame, path: "/"}, 
      React.createElement(DefaultRoute, { handler: ProjectManager }),
      React.createElement(Route, {handler: ProjectManager, name: "manager"},
        React.createElement(DefaultRoute, { handler: ProjectList }),
        React.createElement(Route, {handler: ProjectList, name: "index"}),
        React.createElement(Route, {handler: CreateProject, name: "create"}),
        React.createElement(Route, {handler: EditProject, name: "edit", path: "edit/:projectId"}),
        React.createElement(Route, {handler: ProjectDetail, name: "project", path:"project/:projectId"})
      ),
      React.createElement(Route, {handler: Player, name: "player", path:"project/play/:projectId"})
     )

);

global.onload = function ( ) {
  console.log("Fabnavi boot");
  ProjectStore.init();
  Router.run(routes, function(Handler){
    React.render(React.createElement(Handler, null), document.body);
  });
}
