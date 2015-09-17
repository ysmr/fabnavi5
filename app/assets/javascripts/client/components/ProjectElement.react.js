var React = require('react');
var jade = require('react-jade');
var projectElement = jade.compileFile(__dirname + '/../templates/ProjectElement.jade');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

var ProjectElement = React.createClass({

  propTypes : {
  },


  getInitialState: function() {
    return null;
  },

  getDefaultProps: function() {
     return {
        
     };
   },

  getThumbnailSrc: function () {
    
    var src = null;
    /*
    var thumbnailId = this.props.project.thumbnail_picture_id;
    
    if ( this.props.project.photo.hasOwnProperty( thumbnailId ) ){
      src = this.props.project.photo[thumbnailId].thumbnail.url;
    }
    */

    if ( src == null || src == "" ) {
      src = "/images/noimage.gif";
    }
    return src;
  },

  getUserIconSrc: function () {
    var src = null;
    /*
    var maybeAvater = this.props.project.user.avatar;
    if( maybeAvater != null && ( maybeAvater.url != null || maybeAvater.url != "" )) {
      src = maybeAvater.url;
    }
    */
    if( src == null ){
      src = "/images/user_icon.png";
    }
    return src;
  },

  render : projectElement,

  handleChange: function ( event ){
  },

  handleClick : function( event ) {
    ProjectActionCreator.playProject( this.props.project );
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

module.exports = ProjectElement;

