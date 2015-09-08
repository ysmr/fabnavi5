var React = require('react');
var jade = require('react-jade');
var projectElement = jade.compileFile(__dirname + '/../templates/ProjectElement.jade');
module.exports = React.createClass({

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
    var thumbnailId = this.props.project.thumbnail_picture_id;
    var src = null;
    
    if ( this.props.project.photo.hasOwnProperty( thumbnailId ) ){
      src = this.props.project.photo[thumbnailId].thumbnail.url;
    }

    if ( src == null || src == "" ) {
      src = "/images/noimage.gif";
    }
    return src;
  },

  getUserIconSrc: function () {
    var maybeAvater = this.props.project.user.avatar;
    var src = null;
    if( maybeAvater != null && ( maybeAvater.url != null || maybeAvater.url != "" )) {
      src = maybeAvater.url;
    }
    if( src == null ){
      src = "/images/user_icon.png";
    }
    return src;
  },

  render : projectElement,

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


