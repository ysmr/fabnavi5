// Fabnavi Hierarchical Key Handling State Machine js
// this is KeyBind Controller

var machina = require('machina');
var KeyAction = require('../constants/KeyActionTypes');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

function consume( payload ){
      if( this.keyMap.hasOwnProperty( payload.keyCode ) ){
        var op = this.keyMap[payload.keyCode];
        if( typeof(op) == "function" ){
          payload.type = op();
        } else {
          payload.type = op;
        }
      }
      return payload;
}
var playerStateMachine = new machina.Fsm({
 initialize : function(){
    console.log("FSM initialize");
 },
 namespace : "playerKeyHandler",
 initialState : "play",
  states : {
    "unInitialized" : {
      _onEnter : function(){
        this.keyMap = [];
      },
    },

    "play" : {
      _onEnter : function (){
        console.log("enter play mode");
        this.keyMap = [];
        this.keyMap[13] = KeyAction.PROJECT_SHOOT;
        this.keyMap[39] = KeyAction.PROJECT_NEXT_PAGE;
        this.keyMap[37] = KeyAction.PROJECT_PREV_PAGE;
        this.keyMap[27] = KeyAction.EXIT_PROJECT;
        this.keyMap[67] = function(){this.transition("calibrateCenter");}.bind(this);
        ProjectActionCreator.updateCanvas();
      },

      _onExit : function(){
        console.log("exit play mode");
      },

      consume : function(e){
        var p = consume.call(this,e);
        this.emit("actionFired",p);
      }
    },

    "record" : {

      _onEnter : function (){
        console.log("enter record mode");
        ProjectActionCreator.updateCanvas();
      },

      _onExit : function(){
        console.log("exit record mode");
      },

      consume : function(e){
        var p = consume.call(this,e);
        this.emit("actionFired",p);
      }
    },

    "edit" : {
      _onEnter : function (){
        console.log("enter edit mode");
        ProjectActionCreator.updateCanvas();
      },

      _onExit : function(){
        console.log("exit edit mode");
      },

      consume : function(e){
        var p = consume.call(this,e);
        this.emit("actionFired",p);
      },
    },

    "calibrateCenter" : {
      _onEnter : function (){
        console.log("enter calibrate center mode");
        this.keyMap = [];
        this.keyMap[39] = KeyAction.CALIBRATE_MOVE_RIGHT;
        this.keyMap[37] = KeyAction.CALIBRATE_MOVE_LEFT;
        this.keyMap[40] = KeyAction.CALIBRATE_MOVE_DOWN;
        this.keyMap[27] = KeyAction.EXIT_PROJECT;
        this.keyMap[38] = KeyAction.CALIBRATE_MOVE_UP;
        this.keyMap[67] = function(){this.transition("calibrateScale");}.bind(this);
        ProjectActionCreator.updateCanvas();
      },

      _onExit : function(){
        console.log("exit calibrate center mode");
      },

      consume : function(e){
        var p = consume.call(this,e);
        this.emit("actionFired",p);
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
        this.keyMap[27] = KeyAction.EXIT_PROJECT;
        this.keyMap[67] = function(){this.transition("play");}.bind(this);
        ProjectActionCreator.updateCanvas();
      },

      consume : function(e){
        var p = consume.call(this,e);
        this.emit("actionFired",p);
      },

      _onExit : function(){
        console.log("exit calibrate scale mode");
      },
    },
  },


});

playerStateMachine.on("consume", function(payload){
  console.log("consume firered-----------");
});

var managerStateMachine= new machina.Fsm({
  initialState : "index",
  states : {
    "index" : {

    },

    "create" : {

    },

    "config" : {

    },

    "edit" : {

    },
  },

});

var FSM = new machina.Fsm({
  namespace: "fabnavi",
  initialState : "player",
  states : {
    player : {
      _onEnter : function(){
      },
      _child : playerStateMachine,
      _onExit : function(){
      },
    },
    projectManager: {
      _onEnter : function(){
         
      },
      _child : managerStateMachine,
    },
  },
  consume : function( payload ){
    this.handle("consume",payload);
  },
});
global.FSM = FSM;
module.exports = FSM;
