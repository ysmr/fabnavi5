var NavigationViewActionCreator = require('../actions/NavigationViewActionCreator');
var React = require('react');
var jade = require('react-jade');
var Router = require('react-router'); 
var Link = Router.Link;
var Route = Router.Route;

var menuIcon = jade.compileFile(__dirname + '/../templates/MenuIcon.jade');

<<<<<<< HEAD
var MenuIcon  =  React.createClass({

=======
var MenuIcon = React.createClass({
//Navigation.jadeにあるactとsrc
>>>>>>> upstream/master
  propTypes : {
    act   : React.PropTypes.string.isRequired,
    src   : React.PropTypes.string.isRequired,
  },

  getInitialState: function(){
    return {
    };
  },

<<<<<<< HEAD
  getDefaultProps: function() {
     return {
        
     };
   },

  render : menuIcon,

  onclick : function() {
    NavigationViewActionCreator.menuSelect(this.props.act); 
=======
  getDefaultProps: function(){
    return {
    };
  },

  render : menuIcon,

  onclick : function(){
    NavigationViewActionCreator.menuSelect(this.props.act);
>>>>>>> upstream/master
  },

  componentWillMount : function(){
    return {
    };
  },

  componentDidMount : function (){

  },

  componentWillUpdate : function(){
    return {
    };
  },

  componentDidUpdate : function(){
    return {
    };
  },

  componentWillUnmount : function(){
    return {
    };
  },

});

module.exports = MenuIcon;
