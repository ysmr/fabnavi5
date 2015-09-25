var React = require('react');
var jade = require('react-jade');

var ProjectStore = require('../stores/ProjectStore');
var MainView = require('../player/MainView');
var ViewConfig = require('../player/ViewConfig');
var ProjectActionCreator = require('../actions/ProjectActionCreator');

var Router = require('react-router'); 
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var CalibrateController = require('../player/CalibrateController');
var player = jade.compileFile(__dirname + '/../templates/Player.jade');
var WebAPIUtils = require('../utils/WebAPIUtils');
var State = require('../utils/FabnaviStateMachine');

var _current_file = null;
var _currentImage = null;
var _page_changed = true;
var _last_page = 0;
var _lastState = "";
var _currentState = "";

var Player = React.createClass({
  render:  player,

  contextTypes: {
      router: React.PropTypes.func
  },

  getStateFromStores : function getStateFromStores() {
    return {
      project : ProjectStore.getProject(),
      page : ProjectStore.getCurrentPage(),
      uploadQueue : ProjectStore.getUploadQueue(),
      shooting : ProjectStore.isShooting(),
    };
  },

  _onChange : function () {
    this.setState(this.getStateFromStores());
  },

  _onCanvasUpdate : function () {
    this.updateCanvas();
  },

  _onCanvasClear : function( ){
    this.clearCanvas();
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getDefaultProps: function() {
     return {
     };
   },

  handleSubmit : function( event ){
    if( _current_file == null ) return ;
    WebAPIUtils.uploadFile( _current_file );
  },

  handleFile : function( event ){
    _current_file = event.target.files[0];
  },

  updateCanvas : function(){
    if(this.state.project != null && this.state.project.content.length > 0){

      _currentState = State.compositeState();
      console.log("state : ", _currentState);
      if( _currentState != _lastState ){
        MainView.clear();
      }
      _lastState = _currentState;


      if( _last_page == this.state.page && _currentImage != null ){
        MainView.draw(_currentImage);
        if( _currentState.contains("calibrate") ){
          MainView.showCalibrateLine();
        }
        return 0;
      } 
      var fig = this.state.project.content[this.state.page].figure;
      _last_page = this.state.page;
      if(fig.hasOwnProperty("clientContent") && fig.clientContent.hasOwnProperty("dfdImage")){
        fig.clientContent.dfdImage.then(function(img){
          ViewConfig.setCropped(false);
            MainView.clear();
          MainView.draw(img);
          _currentImage = img;
        }); 
      } else {
        var img = new Image();
        ViewConfig.setCropped(true);
          MainView.clear();
          MainView.showWaitMessage();
        img.src = fig.file.file.url;
        img.onload = function(aImg){
          MainView.clear();
          MainView.draw(img);
          _currentImage = img;
         if( _currentState.contains("calibrate") ){
           MainView.showCalibrateLine();
         }
        }
        img.onerror = function(err){
          console.log("Image load error : ", err, img);
          throw new Error(err);
        }
      }
    }   
    if( _currentState.contains("calibrate") ){
      MainView.showCalibrateLine();
    }
  },

  clearCanvas : function( ){
    MainView.clear();
  },
  
  componentWillMount : function() {
    ProjectActionCreator.getProject({ id: this.context.router.getCurrentParams().projectId});
    },

  componentDidMount : function () {
    ProjectStore.addChangeListener(this._onChange);
    ProjectStore.addCanvasRequestListener(this._onCanvasUpdate);
    ProjectStore.addCanvasClearListener(this._onCanvasClear);

    MainView.init( React.findDOMNode(this.refs.mainCanvas));
    MainView.showWaitMessage();
    State.transition("player");
  },

  componentWillUpdate : function() {
    return {
    };
  },

  componentDidUpdate : function() {
   this.updateCanvas();
  },

  componentWillUnmount : function() {
    State.transition("projectList");
    ProjectStore.removeChangeListener(this._onChange);
    ProjectStore.removeCanvasRequestListener(this._onCanvasUpdate);
    ProjectStore.removeCanvasClearListener(this._onCanvasClear);
  },

});

module.exports = Player;
