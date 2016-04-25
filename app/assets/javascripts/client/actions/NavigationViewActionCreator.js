var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var NavigationViewActionCreator = {

<<<<<<< HEAD
  search : function ( act, text ) {
    if ( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch ({
        type  : ActionTypes[act],
        text  : text,
      });
    }
=======
  search : function ( act, text ){
    AppDispatcher.dispatch({
      type  : ActionTypes.PROJECT_SEARCH,
      text  : text,
    });
>>>>>>> upstream/master
  },

  menuSelect: function ( act ){
    if( ActionTypes.hasOwnProperty(act) ){
      AppDispatcher.dispatch({
        type : ActionTypes[act]
      });
    }
  },
}

module.exports = NavigationViewActionCreator;

