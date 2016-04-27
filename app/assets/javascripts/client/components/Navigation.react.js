var React = require('react');
var MenuIcon = require('./MenuIcon.react.js');
var AccountStore = require('../stores/AccountStore');
var jade = require('react-jade');

var Router = require('react-router');
var Link = Router.Link;

var navigation = jade.compileFile(__dirname + '/../templates/Navigation.jade');
var releaseTime = "loading...";
var Navigation = React.createClass({

  getStateFromStores : function getStateFromStores(){
    return {
      account : AccountStore.getAccountInfo(),
      time : releaseTime,
    };
  },

  _onChange : function (){
    this.setState(this.getStateFromStores());
  },
  getInitialState: function(){
    return this.getStateFromStores();
  },

  getDefaultProps: function(){
    return {
      headerSrc : "images/fav_logo_3.png",
    };
  },

  render : navigation,

  componentWillMount : function(){
  },

  componentDidMount : function (){
    AccountStore.addChangeListener(this._onChange);
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
    AccountStore.removeChangeListener(this._onChange);
  },
});

module.exports = Navigation;
