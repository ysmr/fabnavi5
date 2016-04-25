var React = require('react');
var jade = require('react-jade');
var footer = jade.compileFile(__dirname + '/../templates/Footer.jade');
var Footer = React.createClass({

  propTypes : {
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
=======
  getDefaultProps: function(){
    return {
      footerText : "fabnavi",
    };
  },
>>>>>>> upstream/master

  render : footer,

  handleChange: function( event ){
  },

  onclick : function(){
  },

  componentWillMount : function(){
  },

  componentDidMount : function(){
  },

  componentWillUpdate : function(){
  },

  componentDidUpdate : function(){
  },

  componentWillUnmount : function(){
  },

});

module.exports = Footer;
