var waveForm;
window.onload = function() {
    waveForm = new Player(musique);
};

var margeX = 1;
var margeY = 1;
var tmp = document.documentElement.querySelector(".waveform");
var paddingLeftSize = window.getComputedStyle(tmp, null).getPropertyValue('padding-left');

var x= tmp.clientWidth-paddingLeftSize;
var y= tmp.clientHeight;

var tmpX = x;
var tmpY = y;

window.onresize = function(event) {

    paddingLeftSize = parseInt(window.getComputedStyle(tmp, null).getPropertyValue('padding-left'));

    tmpX = tmp.clientWidth-paddingLeftSize;
    tmpY = tmp.clientHeight;
    // console.log(paddingLeftSize,x,y,tmpX,tmpY);

    if( (Math.abs(tmpX - x) > margeX) || (Math.abs(tmpY-y)> margeY) ){
        x = tmpX;
        y = tmpY;
        waveForm.resizeWaveForm();
    }
};
