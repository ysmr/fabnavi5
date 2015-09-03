var AccountStore = require('stores/AccountStore');
var ProjectStore = require('stores/ProjectStore');
var ProjectSelectorStore = require('stores/ProjectSelectorStore');
var AppDispatcher = require('dispatcher/AppDispatcher');
var KeyActionCreator = require('actions/KeyActionCreator');
var FabnaviApp = require('components/FabnaviApp');

module.exports = function ( ) {
  AccountStore.init();
  ProjectStore.init();
  ProjectSelectorStore.init();
  window.onkeydown = KeyActionCreator.handleKeyDown;
  console.log("Fabnavi boot");
  React.render(React.createElement(FabnaviApp, null), document.body);
}
