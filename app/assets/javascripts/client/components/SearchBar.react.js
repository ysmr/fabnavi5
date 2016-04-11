var NavigationViewActionCreator = require('../actions/NavigationViewActionCreator');
var ProjectServerActionCreator = require('../actions/ProjectServerActionCreator');　
var ServerActionCreator = require('../actions/ServerActionCreator');
var React = require('react');
var jade = require('react-jade');
var searchBar = jade.compileFile(__dirname + '/../templates/SearchBar.jade');
var SearchBar = React.createClass({

  propTypes : {
  },

  getStateFromStores : function () {
    return {
     projects : ProjectListStore.getProjectsAll(),
     selected : ProjectSelectorStore.getSelector(),
    };
  },

  _onChange : function () {
    this.setState(this.getStateFromStores());
  },

  getInitialState: function() {
     return {
     };
  },

  getDefaultProps: function() {
     return {

     };
   },

  render : searchBar,
  handleChange: function ( event ){
    NavigationViewActionCreator.search( "",event.target.value );
  },

  onclick : function() {
  },

  componentWillMount : function() {
  },

  componentDidMount : function () {
  },

  componentWillUpdate : function() {
  },

  componentDidUpdate : function() {
  },

  componentWillUnmount : function() {
  },

});

module.exports = SearchBar;
