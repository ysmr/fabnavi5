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
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;



var projectManager= jade.compileFile(__dirname + '/../templates/ProjectManager.jade');

var ProjectManager = React.createClass({
  render: projectManager
});

module.exports = ProjectManager;
