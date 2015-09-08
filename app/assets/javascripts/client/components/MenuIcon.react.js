var React = require('react');
var jade = require('react-jade');
var menuIcon = jade.compileFile(__dirname + '/../templates/MenuIcon.jade');

module.exports =  React.createClass({

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


