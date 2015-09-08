var React = require('react');
var jade = require('react-jade');
var footer = jade.compileFile(__dirname + '/../templates/footer.jade');
var Footer = React.createClass({

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

  render : footer,

  handleChange: function ( event ){
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

module.exports = Footer;
