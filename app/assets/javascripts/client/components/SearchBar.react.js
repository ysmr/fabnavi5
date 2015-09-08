var React = require('react');
var jade = require('react-jade');
var searchBar = jade.compileFile(__dirname + '/../templates/SearchBar.jade');
module.exports = React.createClass({

  propTypes : {
  },

  getInitialState: function() {
     return {
     };
  },

  getDefaultProps: function() {
     return {
        
     };
   },

  render : seachBar,
  handleChange: function ( event ){
    NavigationViewActionCreator.search( event.target.value );
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


