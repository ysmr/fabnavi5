var ImageConverter = require('../player/ImageConverter');
var ViewConfig = require('../player/ViewConfig');
var CalibrateController = require('../player/CalibrateController');

var MainView = function(){
  var cvs,
      ctx,
      currentImage = null;

  function reset(){
    if(ctx != null)clear();
    _currentImage = null;
    ctx = null;
    cvs = null;
  }

  function init (canvasElement){
    reset();
    initCanvas(canvasElement);
    CalibrateController.init( canvasElement, getCurrentImage );
    ViewConfig.init();
    clear();
  }

  function getCtx(){
    return ctx;
  }

  function getCvs(){
    return cvs;
  }

  function initCanvas(canvasElement){
    cvs = canvasElement;
    ctx = cvs.getContext('2d');
    cvs.width = screen.width;
    cvs.height = screen.height;
    ctx.strokeStyle = "#00ff00";
  }

  function drawCalibrateLine(){
    ctx.strokeStyle = ViewConfig.isCropped() ? "#00ff00" : "#0000ff";
    ctx.beginPath();
    ctx.moveTo(0, cvs.height / 2);
    ctx.lineTo(cvs.width, cvs.height / 2);
    ctx.moveTo(cvs.width / 2, 0);
    ctx.lineTo(cvs.width / 2, cvs.height);
    ctx.stroke();
  }

  function drawWaitingMessage(){
    ctx.fillStyle = "green";
    ctx.font = "100px ArialRoundedMTBoldBold, serif";
    ctx.rotate(Math.PI);
    ctx.translate(-1500, -800);
    ctx.fillText("Now loading...", 400, 400);
    ctx.translate(1500, 800);
    ctx.rotate(-Math.PI);
  }

  function drawShootingMessage(){
    ctx.fillStyle = "green";
    ctx.font = "100px ArialRoundedMTBoldBold, serif";
    ctx.rotate(Math.PI);
    ctx.translate(-1500, -800);
    ctx.fillText("Taking picture...", 400, 400);
    ctx.translate(1500, 800);
    ctx.rotate(-Math.PI);
  }

  function draw(image){
    ImageConverter.drawImage(image, cvs, ViewConfig.conf());
    currentImage = image;
  }

  function redraw(){
    clear();
    if(currentImage)draw(currentImage);
  }

  function clear(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
  }

  function getCurrentImage(){
    return currentImage || false;
  }

  function toDataURL(){
    return cvs.toDataURL();
  }

  function drawMessage(mes, X, Y){
    x = X || 0;
    y = Y || 20;
    ctx.fillStyle = "green";
    ctx.font = "100px ArialRoundedMTBoldBold, serif";
    ctx.rotate(Math.PI);
    ctx.translate(-1500, -800);
    ctx.fillText(mes, x, y);
    ctx.translate(1500, 800);
    ctx.rotate(-Math.PI);
  }

  return {
    init:init,
    draw:draw,
    showWaitMessage:drawWaitingMessage,
    showCalibrateLine:drawCalibrateLine,
    clear:clear,
    redraw:redraw,
    showShootingMessage:drawShootingMessage,
    reset : reset,
    getCtx:getCtx,
    getCvs:getCvs,
    getCurrentImage:getCurrentImage,
    drawMessage:drawMessage,
    toDataURL : toDataURL,
  };
}();

module.exports = MainView;
