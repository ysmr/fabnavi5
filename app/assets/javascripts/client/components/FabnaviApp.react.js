var React = require('react');
var Navigation = require('./Navigation.react');
var SearchBar = require('./SearchBar.react');
var ProjectList = require('./ProjectList.react');
var ProjectManager = require('./ProjectManager.react');
var Player = require('./Player.react.js');
var Frame = require('./Frame.react.js');
var Footer = require('./Footer.react.js');

var jade = require('react-jade');
var fabnaviApp = jade.compileFile(__dirname + '/../templates/FabnaviApp.jade');

var Router = require('react-router'); 
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var FabnaviApp = React.createClass({
  render : fabnaviApp
});

module.exports = FabnaviApp;
