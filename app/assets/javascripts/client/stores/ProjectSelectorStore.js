var EventEmitter = require('events');
var machina = require('machina');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectStore = require('../stores/ProjectStore');


var _selector  = {
};
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');


var ProjectSelectorStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _selector = {
      index : 0,
      row   : 0,
      col   : 0,
    };
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

var keyMap = [];
var ProjectSelectorState = new machina.Fsm({
  initialize : function() {
  },

  initialState : "projects",

  states : {
    
    projects : {
      setSelectorByIndex : function setSelectorByIndex( index ){
        //validates selector
        var projects = ProjectStore.getProjectsAll();
        if( index >= projects.length ) {
          index = projects.length -1;
        } else if( index < 0 ) {
          index = 0;
        };
        ProjectSelectorStore.setSelectorIndex( index );
      },

      _onEnter : function( ){
        keyMap[38] = this.states.projects.up;
        keyMap[40] = this.states.projects.down;
        keyMap[39] = this.states.projects.right;
        keyMap[37] = this.states.projects.left;
      },

      up : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index - 4 );
      },  

      down : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index +4 );
      },  

      left : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index -1 );
      },  

      right : function () {
        ProjectSelectorState.setSelectorByIndex( _selector.index +1 );
      },  
    },

    projectMenu : {

    },

    navigation : {

    },

    searchBar : {

    },

  },

  up: function(){
    this.handle('up');
  },

  down : function(){
    this.handle('down');
  },
  left : function(){
    this.handle('left');
  },
  right : function(){
    this.handle('right');
  },

  setSelectorByIndex: function( index ){
    this.handle('setSelectorByIndex', index);
  },
});

ProjectSelectorStore.dispatchToken = AppDispatcher.register(function( action ){
  switch( action.type ){
    case ActionTypes.KEY_DOWN:
      if( keyMap.hasOwnProperty( action.keyCode ) ){
        keyMap[action.keyCode]();
      }  
      break;
    case ActionTypes.MOVE_TOP:
      location.hash = "#/"
      break;
    case ActionTypes.MOVE_MY_PROJECTS:
      location.hash = "#/manager"
      break;
    case ActionTypes.MOVE_CONFIG:
      location.hash = "#/manager/config"
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
