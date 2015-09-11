var React = require('react');
var Navigation = require('./Navigation.react');
var SearchBar = require('./SearchBar.react');
var ProjectList = require('./ProjectList.react');
var ProjectManager = require('./ProjectManager.react');
var Player = require('./Player.react.js');
var Frame = require('./Frame.react.js');
var Footer = require('./Footer.react.js');

var jade = require('react-jade');

var Router = require('react-router'); 
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var routes = (
    React.createElement(Route, {handler: Frame, path: "/"}, 
      React.createElement(DefaultRoute, {handler: Player}),
      React.createElement(Route, {handler: ProjectManager, name: "manager"}),
      React.createElement(Route, {handler: Player, name: "player"})
     )

);

global.onload = function ( ) {
  console.log("Fabnavi boot");
  Router.run(routes, function(Handler){
    React.render(React.createElement(Handler, null), document.body);
  });
}
