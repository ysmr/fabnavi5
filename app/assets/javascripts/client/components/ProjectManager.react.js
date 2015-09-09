var React = require('react');
var jade = require('react-jade');
var projectManager= jade.compileFile(__dirname + '/../templates/ProjectManager.jade');

var ProjectManager = React.createClass({
  render: projectManager
});

module.exports = ProjectManager;
