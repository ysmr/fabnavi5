var EventEmitter = require('events');
var machina = require('machina');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectListStore = require('../stores/ProjectListStore');


var _selector  = {
};
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var KeyActionTypes = require('../constants/KeyActionTypes');


var ProjectSelectorStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _selector = {
      index : 0,
      row   : 0,
      col   : 0,
    };
  },

  setSelectorByIndex : function setSelectorByIndex( index ){
   //validates selector
   var projects = ProjectListStore.getProjectsAll();
   if( index >= projects.length ) {
    index = projects.length -1;
   } else if( index < 0 ) {
    index = 0;
   };
   ProjectSelectorStore.setSelectorIndex( index );
  },

  up : function () {
   this.setSelectorByIndex( _selector.index - 4 );
  },  

  down : function () {
   this.setSelectorByIndex( _selector.index +4 );
  },  

  left : function () {
   this.setSelectorByIndex( _selector.index -1 );
  },  

  right : function () {
   this.setSelectorByIndex( _selector.index +1 );
  },  

  setSelectorIndex : function ( index  ){
    _selector.index = index;
    _selector.col   = index % 4;
    _selector.row   = Math.floor(index / 4);
    this.emitChange();
  },

  getSelector : function (){
    return _selector;
  },

  emitChange : function(){
    this.emit(EventTypes.PROJECT_SELECTOR_CHANGE);
  },

  addChangeListener: function(callback) {
    this.on(EventTypes.PROJECT_SELECTOR_CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(EventTypes.PROJECT_SELECTOR_CHANGE, callback);
  },
});

ProjectSelectorStore.dispatchToken = AppDispatcher.register(function( action ){
  switch( action.type ){
    case KeyActionTypes.SELECT_PROJECT_UP:
      ProjectSelectorStore.up();
      break;
    case KeyActionTypes.SELECT_PROJECT_DOWN:
      ProjectSelectorStore.down();
      break;
    case KeyActionTypes.SELECT_PROJECT_LEFT:
      ProjectSelectorStore.left();
      break;
    case KeyActionTypes.SELECT_PROJECT_RIGHT:
      ProjectSelectorStore.right();
      break;
    case ActionTypes.MOVE_TOP:
      location.hash = "#/manager"
      break;
    case ActionTypes.MOVE_MY_PROJECTS:
      location.hash = "#/manager"
      break;
    case ActionTypes.MOVE_CONFIG:
      location.hash = "#/manager"
      break;
    case ActionTypes.MOVE_NEW_PROJECT:
      location.hash = "#/manager/create"
      break;
    default:
      console.log("Action fired : ", action );
      break;
  };
});

ProjectSelectorStore.init();
module.exports = ProjectSelectorStore;
