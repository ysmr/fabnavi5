var React = require('react');
var jade = require('react-jade');
var projectElement = jade.compileFile(__dirname + '/../templates/ProjectElement.jade');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

var ProjectElement = React.createClass({

  propTypes : {
  },

  getInitialState: function(){
    return null;
  },

<<<<<<< HEAD
  getDefaultProps: function() {
     return {
        
     };
   },

  getThumbnailSrc: function () {
    
=======
  getDefaultProps: function(){
    return {
    };
  },

  getThumbnailSrc: function (){

>>>>>>> upstream/master
    var src = null;

    if( this.props.project.hasOwnProperty("figure") ){
      var thumb = this.props.project.figure;
      if( thumb.hasOwnProperty("attachment") ){
        src = this.props.project.figure.attachment.file.thumb;
      }
    }

<<<<<<< HEAD
    if ( src == null || src == "" ) {
      src = "/images/noimage.gif";
=======
    if( src == null || src == "" ){
      src = "/images/kaffcop_icon/fab_samp.jpg";
>>>>>>> upstream/master
    }
    return src;
  },

  getUserIconSrc: function (){
    var src = null;
    if( src == null ){
      src = "/images/user_icon.png";
    }
    return src;
  },

  render : projectElement,

  handleChange: function ( event ){
  },

  handleClick : function( event ){
    ProjectActionCreator.playProject( this.props.project );
  },

  componentWillMount : function(){
  },

  componentDidMount : function (){
  },

  componentWillUpdate : function(){
  },

  componentDidUpdate : function(){
  },

  componentWillUnmount : function(){
  },
});

module.exports = ProjectElement;

