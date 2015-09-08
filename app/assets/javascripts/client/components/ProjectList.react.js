var React = require('react');
var ProjectStore = require('../stores/ProjectStore');
var ProjectSelectorStore = require('../stores/ProjectSelectorStore');
var jade = require('react-jade');
var projectList= jade.compileFile(__dirname + '/../templates/ProjectList.jade');
module.exports = React.createClass({

  propTypes : {

  },

  getStateFromStores : function () {
    return {
     projects : ProjectStore.getProjectsAll(),
     selected : ProjectSelectorStore.getSelector(),
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

  render : projectList,  
  
  handleChange: function ( event ){
  },

  onclick : function() {
  },

  componentWillMount : function() {
  },

  componentDidMount : function () {
    ProjectStore.addChangeListener(this._onChange);
    ProjectSelectorStore.addChangeListener(this._onChange);
  },

  componentWillUpdate : function() {
  },

  componentDidUpdate : function() {
  },

  componentWillUnmount : function() {
    ProjectStore.removeChangeListener(this._onChange);
    ProjectSelectorStore.removeChangeListener(this._onChange);
  },

});


