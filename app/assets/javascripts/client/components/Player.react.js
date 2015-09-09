var React = require('react');
var jade = require('react-jade');
var player = jade.compileFile(__dirname + '/../templates/Player.jade');

var Player = React.createClass({
  render:  player
});

module.exports = Player;
