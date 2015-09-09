var FabnaviApp = require('./components/FabnaviApp.react');
var React = require('react');
var Router = require('react-router'); 
global.$ = global.jQuery = require('jquery');
require('jquery-ujs');

global.onload = function ( ) {
  console.log("Fabnavi boot");
  Router.run(FabnaviApp, function(Handler){
    React.render(React.createElement(Handler, null), document.body);
  });
}
