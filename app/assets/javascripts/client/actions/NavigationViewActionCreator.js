var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var NavigationViewActionCreator = {

  search : function ( act, text ) {
    if ( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch ({
        type  : ActionTypes[act],
        text  : text,
      });
    }
  },

  menuSelect: function ( act ) {
    if ( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch ({
        type : ActionTypes[act]
      });
    }
  },
}

module.exports = NavigationViewActionCreator;

