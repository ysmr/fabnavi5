var React = require('react');
var Navigation = require('./Navigation.react.js');
var SearchBar = require('./SearchBar.react.js');
var ProjectList = require('./ProjectList.react.js');
var Footer = require('./Footer.react.js');
var jade = require('react-jade');
var fabnaviApp = jade.compileFile(__dirname + '/../templates/FabnaviApp.jade');
var FabnaviApp = React.createClass({
  render : fabnaviApp
});

module.exports = FabnaviApp;
