var waveForm;
window.onload = function() {
    waveForm = new Player(musique[0]);
};

var margeX = 1;
var margeY = 1;
var waveFormElement = document.documentElement.querySelector(".waveform");
var paddingLeftSize = parseInt(window.getComputedStyle(waveFormElement, null).getPropertyValue('padding-left'));

var x= waveFormElement.clientWidth-paddingLeftSize;
var y= waveFormElement.clientHeight;

var tmpX = x;
var tmpY = y;

window.onresize = function(event) {

    paddingLeftSize = parseInt(window.getComputedStyle(waveFormElement, null).getPropertyValue('padding-left'));

    tmpX = waveFormElement.clientWidth-paddingLeftSize;
    tmpY = waveFormElement.clientHeight;

    if( (Math.abs(tmpX - x) > margeX) || (Math.abs(tmpY-y)> margeY) ){
        x = tmpX;
        y = tmpY;
        console.log("resize");
        waveForm.resizeWaveForm();
    }
};
