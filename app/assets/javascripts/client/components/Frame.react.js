var React = require('react');
var jade = require('react-jade');
var frame = jade.compileFile(__dirname + '/../templates/Frame.jade');

var Router = require('react-router'); 
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Frame = React.createClass({
  render : frame
});

module.exports = Frame;
