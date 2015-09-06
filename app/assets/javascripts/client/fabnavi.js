var FabnaviApp = require('../components/FabnaviApp.react');
var React = require('react');
window.machina = require('machina');
window.EventEmitter = require('events');
window.React = require('react');
window.$ = window.jQuery = require('jquery')
require('jquery-ujs')

window.onload = function ( ) {
  console.log("Fabnavi boot");
  React.render(React.createElement(FabnaviApp, null), document.body);
}
