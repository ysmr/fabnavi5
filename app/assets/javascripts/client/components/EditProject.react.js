var React = require('react');
var ProjectStore = require('../stores/ProjectStore');
var jade = require('react-jade');

var Router = require('react-router'); 
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var editProject = jade.compileFile(__dirname + '/../templates/EditProject.jade');
var EditProject = React.createClass({

  contextTypes: {
      router: React.PropTypes.func
  },

  getStateFromStores : function getStateFromStores() {
    return {
    };
  },

  _onChange : function () {
    this.setState(this.getStateFromStores());
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },

  getDefaultProps: function() {
     return {
     };
   },

  render : editProject,

  componentWillMount : function() {
  },

  componentDidMount : function () {
  },

  componentWillUpdate : function() {
    return {
    };
  },

  componentDidUpdate : function() {
    return {
    };
  },

  componentWillUnmount : function() {
  },


});

module.exports = EditProject;
