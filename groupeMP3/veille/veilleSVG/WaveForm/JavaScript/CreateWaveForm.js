function CreateWaveForm(tabs, url) {

    var generation = function(url) {
        var mySound;
        soundManager.setup({
            onready: function() {
                mySound = soundManager.createSound({
                    id: 'aSound',
                    url: url
                });
                mySound.setVolume(100);
                mySound.play({
                    whileplaying: function() {
                        // console.log(this.duration);
                        var rectTab = document.querySelectorAll(".rect");
                        var target = rectTab[Math.round(this.position / (mySound.duration / rectTab.length))];
                        //console.log((mySound.position/1000).toFixed(2) + "s");
                        if (target != null) {
                            //console.log(target.id);
                            clickTab(target, false);
                        }

                    },
                });
            },
        });
        return mySound;
    };

    this.createSVG = function(tabs) {
        var pSVG = document.querySelector(".waveform");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        var svgNS = svg.namespaceURI;
        svg.classList.add("svg");

        for (var i = 0; i < tabs.length; i++) {
            var rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', 4 * (i + 1));
            rect.setAttribute('y', 50 + (255 - tabs[i]));
            rect.setAttribute('width', 3);
            rect.setAttribute('height', tabs[i] * 2);
            rect.setAttribute('class', 'rect');
            rect.setAttribute('data-numRect', i);

            rect.addEventListener("mouseover", function(e) {
                hoverTab(e.currentTarget);
            });

            rect.addEventListener("click", function(e) {
                clickTab(e.currentTarget, true);
            });
            svg.appendChild(rect);
        }
        pSVG.appendChild(svg);
        this.mySound = generation(this.url);
        mySound = this.mySound;

    };

    this.clearSVG = function(){
        var svg = document.querySelector(".svg");
        svg.parentNode.removeChild(svg);
        // var rectTab = document.querySelectorAll(".rect");
        // rectTab.forEach(function(element) {
        //     element.parentNode.removeChild(element);
        // });
        this.mySound.destruct();
        mySound.destruct();
    };


    var clickTab = function(target, isClick) {
        var rectTab = document.querySelectorAll(".rect");

        rectTab.forEach(function(element) {
            var rectId = parseInt(element.getAttribute('data-numRect'));
            var targetId = parseInt(target.getAttribute('data-numRect'));

            if (rectId <= targetId) {
                if (!rectTab[rectId].classList.contains("clicked")) {
                    rectTab[rectId].classList.add("clicked");
                }
                if (rectTab[rectId].classList.contains("passed")) {
                    rectTab[rectId].classList.remove("passed");
                }
            } else {
                if (rectTab[rectId].classList.contains("clicked")) {
                    rectTab[rectId].classList.remove("clicked");
                }
                if (rectTab[rectId].classList.contains("passed") && isClick) {
                    rectTab[rectId].classList.remove("passed");
                }
            }
            if (isClick) {
                var position = targetId * (mySound.duration / rectTab.length);
                // console.log(mySound.duration);
                mySound.setPosition(position);
                // console.log("SET Time : " + mySound.position/1000 + "s");
            }

        });
    };

    var hoverTab = function(target) {
        var rectTab = document.querySelectorAll(".rect");
        rectTab.forEach(function(element) {
            var rectId = parseInt(element.getAttribute('data-numRect'));
            var targetId = parseInt(target.getAttribute('data-numRect'));

            if (rectId == targetId) {
                rectTab[rectId].setAttribute('stroke', 'black');
                rectTab[rectId].setAttribute('stroke-width', '2');
            } else {
                rectTab[rectId].removeAttribute('stroke');
            }

            if (rectId <= targetId) {
                if (!rectTab[rectId].classList.contains("clicked")) {
                    rectTab[rectId].classList.add("passed");
                } else {
                    // rectTab[rectId].classList.remove("passed");
                }
            } else {
                if (!rectTab[rectId].classList.contains("clicked")) {
                    if (rectTab[rectId].classList.contains("passed")) {
                        rectTab[rectId].classList.remove("passed");
                    }
                } else {
                    // rectTab[rectId].classList.add("passed");
                }
            }
        });
    };

    var prevButton = function() {
        //console.log("position : " + parseInt(mySound.position/1000) + "s");
        if (parseInt(mySound.position / 1000) > 5) {
            var rectTab = document.querySelectorAll(".rect");
            rectTab.forEach(function(element) {
                if (element.getAttribute('data-numRect') == 0) {
                    clickTab(element, true);
                    //mySound.setPosition(0);
                }
            });

        } else {
            alert("<== Previous SOUND");
            //A faire quand y aura des playlist
        }
    };

    var playPauseButton = function(element) {
        if (Object.is(element.getAttribute("class"), "play-pause play")) {
            console.log("Pause");
            element.classList.replace("play", "pause");
            mySound.pause();
        } else {
            console.log("Play");
            element.classList.replace("pause", "play");
            mySound.play();
        }
    };

    var nextButton = function() {
        console.log("You click on Next Button");
        //A faire quand y aura des playlist
    };

    var volumeButton = function() {
        var volumeControl = document.querySelector('.vol-control');
        if (Object.is(volumeControl.getAttribute("class"), "vol-control hidden")) {
            volumeControl.classList.replace("hidden", "notHidden");
            volumeControl.style.visibility = "visible";
            //volumeControl.style.display = "inline";
        } else {
            volumeControl.classList.replace("notHidden", "hidden");
            //Le rend just invisible
            volumeControl.style.visibility = "hidden";
            //Ne l'affiche pas
            //volumeControl.style.display = "none";
        }
    };

    var volumeChanged = function(element) {
        console.log("you change the volume value : " + element.value);
        console.log(mySound);
        mySound.setVolume(element.value);
    };

    var addVolumeControl = function() {
        var volumeControl = document.createElement('input');
        volumeControl.setAttribute('class', 'vol-control hidden');
        volumeControl.setAttribute('type', 'range');
        //volumeControl.setAttribute("orient", "vertical");
        volumeControl.setAttribute('value', '100');
        volumeControl.setAttribute('min', '0');
        volumeControl.setAttribute('max', '100');
        volumeControl.setAttribute('step', '1');
        volumeControl.style.visibility = "hidden";
        //volumeControl.style.display = "none";

        volumeControl.addEventListener("change", function(e) {
            volumeChanged(e.target);
        });

        document.querySelector('.controls').appendChild(volumeControl);
    };

    var addButtonListener = function() {
        document.querySelector(".prev").addEventListener("click", function() {
            prevButton();
        });
        document.querySelector(".play-pause.play").addEventListener("click", function(e) {
            playPauseButton(e.target);
        });
        document.querySelector(".next").addEventListener("click", function() {
            nextButton();
        });
        document.querySelector(".volume").addEventListener("click", function() {
            volumeButton();
        });
    };

    this.tabs = tabs;
    this.url = url;
    var mySound;
    this.createSVG(this.tabs);
    console.log("Creation DONE !");
    addVolumeControl();
    addButtonListener();

}
