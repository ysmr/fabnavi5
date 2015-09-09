var React = require('react');
var jade = require('react-jade');
var frame = jade.compileFile(__dirname + '/../templates/Frame.jade');

var Frame = React.createClass({
  render : frame
});

module.exports = Frame;
