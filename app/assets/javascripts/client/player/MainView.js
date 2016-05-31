const ImageConverter = require('../player/ImageConverter');
const ViewConfig = require('../player/ViewConfig');
const CalibrateController = require('../player/CalibrateController');

const MainView = function(){
  let cvs,
      ctx,
      currentImage = null;

  function reset(){
    if(ctx != null)clear();
    currentImage = null;
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
    ctx.font = "100px NotoSans-Regular, sans-serif";
    ctx.textBaseline = 'top';
    ctx.lineWidth = 5.0;
    ctx.strokeStyle = "#343434";
    ctx.strokeText("Now Loading...", cvs.width/2-300,cvs.height/2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Now Loading...", cvs.width/2-300,cvs.height/2);
  }

  function drawInstructionMessage(){
    ctx.font = "40px NotoSans-Regular, sans-serif";
    ctx.textBaseline = 'top';
    ctx.lineWidth = 5.0;
    ctx.strokeStyle = "#343434";
    ctx.strokeText("C Key : Calibration Mode", cvs.width/8,cvs.height/8);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("C Key : Calibration Mode", cvs.width/8,cvs.height/8);
    ctx.strokeStyle = "#343434";
    ctx.strokeText("↑ Key : Expand", cvs.width/8,cvs.height/8+50);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("↑ Key : Expand", cvs.width/8,cvs.height/8+50);
    ctx.strokeStyle = "#343434";
    ctx.strokeText("↓ Key : Shrink", cvs.width/8,cvs.height/8+100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("↓ Key : Shrink", cvs.width/8,cvs.height/8+100);
    ctx.strokeStyle = "#343434";
    ctx.strokeText("← Key : To Privious Page", cvs.width/8,cvs.height/8+150);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("← Key : To Privious Page", cvs.width/8,cvs.height/8+150);
    ctx.strokeStyle = "#343434";
    ctx.strokeText("→ Key : To Next Page", cvs.width/8,cvs.height/8+200);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("→ Key : To Next Page", cvs.width/8,cvs.height/8+200);
    ctx.strokeStyle = "#343434";
    ctx.strokeText("→ Key : To Next Page", cvs.width/8,cvs.height/8+250);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("→ Key : To Next Page", cvs.width/8,cvs.height/8+250);
    ctx.strokeStyle = "#343434";
    ctx.strokeText("esc Key : Back To Home", cvs.width/8,cvs.height/8+300);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("esc Key : Back To Home", cvs.width/8,cvs.height/8+300);

  }

  function drawShootingMessage(){
    ctx.fillStyle = "#343434";
    ctx.font =  "100px NotoSans-Regular, sans-serif";
    ctx.translate(-(cvs.width/2+300), -(cvs.height/2));
    ctx.fillText("Taking picture...", 0, 0);
    ctx.translate(cvs.width/2+300, cvs.height/2);
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
    const
        x = X || 0,
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
    showInstructionMessage:drawInstructionMessage,
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
