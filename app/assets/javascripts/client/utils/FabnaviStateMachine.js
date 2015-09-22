// Fabnavi Hierarchical Key Handling State Machine js
// this is KeyBind Controller

var machina = require('machina');
var KeyAction = require('../constants/KeyActionTypes');

var FSM = new machina.Fsm({
 initialize : function(){
    console.log("FSM initialize");
 },
 initialState : "play",
  states : {

    "play" : {
      _onEnter : function (){
        console.log("enter play mode");
        this.keyMap = [];
        this.keyMap[13] = KeyAction.PROJECT_SHOOT;
        this.keyMap[39] = KeyAction.PROJECT_NEXT_PAGE;
        this.keyMap[37] = KeyAction.PROJECT_PREV_PAGE;
      },

      _onExit : function(){
        console.log("exit play mode");
      },
    },

    "record" : {

      _onEnter : function (){
        console.log("enter record mode");
      },

      _onExit : function(){
        console.log("exit record mode");
      },
    },

    "edit" : {
      _onEnter : function (){
        console.log("enter edit mode");
      },

      _onExit : function(){
        console.log("exit edit mode");
      },

    },

    "calibrateCenter" : {
      _onEnter : function (){
        console.log("enter calibrate center mode");
        this.keyMap = [];
        this.keyMap[39] = KeyAction.CALIBRATE_MOVE_RIGHT;
        this.keyMap[37] = KeyAction.CALIBRATE_MOVE_LEFT;
        this.keyMap[40] = KeyAction.CALIBRATE_MOVE_DOWN;
        this.keyMap[38] = KeyAction.CALIBRATE_MOVE_UP;
      },

      _onExit : function(){
        console.log("exit calibrate center mode");
      },

    },

    "calibrateScale" : {
      _onEnter : function (){
        console.log("enter calibrate scale mode");
        this.keyMap = [];
        this.keyMap[39] = KeyAction.CALIBRATE_LONGER_HORIZONTAL;
        this.keyMap[37] = KeyAction.CALIBRATE_SHORTER_HORIZONTAL;
        this.keyMap[40] = KeyAction.CALIBRATE_LONGER_VERTICAL;
        this.keyMap[38] = KeyAction.CALIBRATE_SHORTER_VERTICAL;
      },

      _onExit : function(){
        console.log("exit calibrate scale mode");
      },
    },
  },

    consume : function( payload ){
      if( this.keyMap.hasOwnProperty( payload.keyCode ) ){
        payload.type = this.keyMap[payload.keyCode];
      }
      return payload;
    },

});

global.FSM = FSM;
module.exports = FSM;
