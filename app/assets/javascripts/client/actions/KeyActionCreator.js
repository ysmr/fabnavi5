var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ActionTypes = require('../constants/ActionTypes');
var FSM = require('../utils/FabnaviStateMachine');

module.exports = KeyActionCreator = {
  handleKeyDown : function ( event ) {
    //if input element changed, 'handleKeyDown' does't handle keyEvent
    if( event.target.nodeName == "INPUT" )return ;
    //if metakey pressed, Fabnavi won't handle this keyEvent
    if(event.metaKey) return 0;
    event.preventDefault();
    event.stopped = true;

    var payload = {
      keyCode : event.keyCode,
      charCode: event.charCode,
      ctrl    : event.ctrlKey,
      alt     : event.altKey,
      meta    : event.metaKey,
      shift   : event.shiftKey,
      type    : "NOT_REGISTER",
    };
    var p = FSM.consume( payload );
    AppDispatcher.dispatch(p);
  },
}

window.onkeydown = KeyActionCreator.handleKeyDown;
