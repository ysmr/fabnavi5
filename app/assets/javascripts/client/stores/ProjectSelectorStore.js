//Menuのデータとかはここにあるっぽい location.hash
var EventEmitter = require('events');
var machina = require('machina');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectListStore = require('../stores/ProjectListStore');


var _selector  = {
};
var EventTypes = require('../constants/EventTypes');
var ActionTypes = require('../constants/ActionTypes');
var KeyActionTypes = require('../constants/KeyActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');


var ProjectSelectorStore = Object.assign({}, EventEmitter.prototype, {
  init : function () {
    _selector = {
      index : 0,
      row   : 0,
      col   : 0,
      openMenu : false,
      menuIndex : 0,
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

  explode : function(){
    if(!_selector.openMenu)throw new Error("Ilegal Action");
    var projects = ProjectListStore.getProjectsAll();
    var project = projects[_selector.index];
    switch(_selector.menuIndex){
      case 0:
        setTimeout(function(){
       ProjectActionCreator.playProject( project );
        },0);
       _selector.openMenu = false;
       _selector.menuIndex = 0;
       break;
      case 4:
        setTimeout(function(){
       ProjectActionCreator.deleteProject( project );
        },0);
       _selector.openMenu = false;
       _selector.menuIndex = 0;
       break;
    };
  },
  open : function () {
    _selector.openMenu = true;
    _selector.menuIndex = 0;
    ProjectSelectorStore.emitChange();
  },

  close : function () {
    _selector.openMenu = false;
    ProjectSelectorStore.emitChange();
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

  nextAction : function(){
    _selector.menuIndex++;
    if(_selector.menuIndex > 4){
      _selector.menuIndex = 4;
    }
    this.emitChange();
  },

  prevAction : function(){
    _selector.menuIndex--;
    if(_selector.menuIndex < 0){
      _selector.menuIndex = 0;
    }
    this.emitChange();
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
    case KeyActionTypes.SELECT_PROJECT:
      ProjectSelectorStore.open();
      break;
    case KeyActionTypes.DESELECT_ACTION:
      ProjectSelectorStore.close();
      break;
    case KeyActionTypes.SELECT_ACTION:
      ProjectSelectorStore.explode();
      break;
    case KeyActionTypes.SELECT_ACTION_UP:
      ProjectSelectorStore.prevAction();
      break;
    case KeyActionTypes.SELECT_ACTION_DOWN:
      ProjectSelectorStore.nextAction();
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
