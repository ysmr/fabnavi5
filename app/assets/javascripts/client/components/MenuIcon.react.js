var NavigationViewActionCreator = require('../actions/NavigationViewActionCreator');
var React = require('react');
var jade = require('react-jade');
var Router = require('react-router'); 
var Link = Router.Link;
var Route = Router.Route;



var menuIcon = jade.compileFile(__dirname + '/../templates/MenuIcon.jade');

var MenuIcon  =  React.createClass({

  propTypes : {
    act   : React.PropTypes.string.isRequired,
    src   : React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
     return {
     };
  },

  getDefaultProps: function() {
     return {
        
     };
   },

  render : menuIcon,

  onclick : function() {
    NavigationViewActionCreator.menuSelect(this.props.act); 
  },

  componentWillMount : function() {
    return {
    };
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
    return {
    };
  },


});

module.exports = MenuIcon;
