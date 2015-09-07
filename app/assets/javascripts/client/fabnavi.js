var FabnaviApp = require('./components/FabnaviApp.react');
var React = require('react');
global.$ = global.jQuery = require('jquery');
require('jquery-ujs');

global.onload = function ( ) {
  console.log("Fabnavi boot");
  React.render(React.createElement(FabnaviApp, null), document.body);
}
