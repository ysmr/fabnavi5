var React = require('react');
var jade = require('react-jade');
var player = jade.compileFile(__dirname + '/../templates/Player.jade');
var WebAPIUtils = require('../utils/WebAPIUtils');

var _current_file = null;

var Player = React.createClass({
  render:  player,

  handleSubmit : function( event ){
    console.log(event);
    if( _current_file == null ) return ;
    WebAPIUtils.uploadFile( _current_file );
  },

  handleFile : function( event ){
    console.log(event);
    _current_file = event.target.files[0];
  },
  
});

module.exports = Player;
