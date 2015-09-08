var React = require('react');
var MenuIcon = require('./MenuIcon.react.js');
var AccountStore = require('../stores/AccountStore');
var jade = require('react-jade');
var navigation = jade.compileFile(__dirname + '/../templates/Navigation.jade');
module.exports = React.createClass({

  getStateFromStores : function getStateFromStores() {
    return {
     account : AccountStore.getAccountInfo()
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
        headerSrc : "images/h_logo.png",
     };
   },

  render : navigation,

  componentWillMount : function() {
  },

  componentDidMount : function () {
    AccountStore.addChangeListener(this._onChange);
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
    AccountStore.removeChangeListener(this._onChange);
  },


});


