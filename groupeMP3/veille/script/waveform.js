// interval=797.5836725

function IntervalTimer(callback, interval) {
  var timerId, timeoutId = 0, startTime, remaining = 0,remainingTime=0;
  var state = 0; //  0 = idle, 1 = running, 2 = paused

  this.pause = function () {
    if(state!=1){
      return;
    }
    window.clearInterval(timerId);
    if(remaining!=0){
      remaining=remaining - ((new Date() - remainingTime));
    }
    else{
      remaining = interval - ((new Date() - startTime)%interval);
    }
    //console.log(remaining+"et"+count);
    if(timeoutId!=0){
      window.clearTimeout(timeoutId);
    }
    state = 2;
  };

  this.resume = function () {
    if (state != 2){
      return;
    }
    state = 1;
    remainingTime= new Date();
    timeoutId=window.setTimeout(this.timeoutCallback, remaining);
  };

  this.timeoutCallback = function(){
    remaining=0;
    remainingTime=0;
    timeoutId=0;
    callback();
    startTime = new Date();
    timerId = window.setInterval(callback, interval);
    state = 1;
  };

  this.clear = function(){
    if(remaining>0){
      window.clearTimeout(timeoutId);
    }
    else{
      window.clearInterval(timerId);
    }
  }

  startTime = new Date();
  timerId = window.setInterval(callback, interval);
  state = 1;

}


var canvas = document.getElementById("canvas");
var image = document.getElementsByClassName("img")[0];
var bouton = document.getElementById("startAndPause");
var worker = new Worker("./script/worker.js");
var fg = new Image();
fg.src = "./libs/png/a.png";
var d = new Date();
var duration;
var music = document.getElementById("audio");
var current = document.getElementById("current");
current.src="./libs/mp3/a.mp3";
var stopIntervalId;
var timer;
var pas;
//var count=0;
var longueurMax=0;

image.onload=function(){
  canvas.height=image.height;
  longueurMax=image.width;
}

function audioDone(){
  duration=music.duration;
  pas=longueurMax/duration;
}

music.addEventListener('canplaythrough', audioDone, false);

function repaint(){
  if(canvas && canvas.getContext) {
    // Initaliase a 2-dimensional drawing context
    x = canvas.getContext('2d');
    width = x.canvas.width;
    height = x.canvas.height;

    // create offscreen buffer
    buffer = document.createElement('canvas');
    buffer.width = fg.width;
    buffer.height = fg.height;
    bx = buffer.getContext('2d');

    // fill offscreen buffer with the tint color
    bx.fillStyle = '#FF0000'
    bx.fillRect(0,0,buffer.width,buffer.height);

    // destination atop makes a result with an alpha channel identical to fg, but with all pixels retaining their original color *as far as I can tell*
    bx.globalCompositeOperation = "destination-atop";
    bx.drawImage(fg,0,0);


    // to tint the image, draw it first
    x.drawImage(fg,0,0);

    //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
    x.globalAlpha = 0.5;
    x.drawImage(buffer,0,0);
  }
}

function getClickPosition(e){

  var bounds = event.target.getBoundingClientRect();
  canvas.className="";
  canvas.width=e.clientX-bounds.left;
  music.currentTime=canvas.width*(1/pas);
  repaint();

}

music.onpause=function(){
    timer.pause();
}

function play(){

  music.play();

  //stopIntervalId=setInterval(function() {/*console.log(canvas.width);*/canvas.width+=1;/*console.log(canvas.width);*/repaint();/*console.log(Date.now());*/}, (1/pas)*1000);
  //worker.postMessage(document.getElementById("audio").duration);

  if(timer==null){
    timer=new IntervalTimer(function(){
      canvas.width+=1;
      console.log(canvas.width);
      //count++;
      repaint();
    },(1/pas)*1000);
  }
  else{
    timer.resume();
  }

  bouton.value="Pause";
  bouton.setAttribute("onclick","pause()");

}

function pause(){

  music.pause();

  //clearInterval(stopIntervalId);

  bouton.value="Play";
  bouton.setAttribute("onclick","play()");

}

/**worker.addEventListener('message', function(e) {
  console.log("Ok");
});*/

image.addEventListener("click",getClickPosition);
canvas.addEventListener("click",getClickPosition);
