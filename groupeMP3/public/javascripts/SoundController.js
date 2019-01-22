function SoundController(sound){

//----------------------------Controller Function-------------------------------

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

    var playPauseButton = function() {
      var mainPlayPauseButton = document.querySelector(".controls button[class~='play-pause']");
      var currentSongId = mainPlayPauseButton.getAttribute("data-numButton");
      var secondePlayPauseButton = document.querySelector("ol li button[data-numButton='"+currentSongId+"']");
      //Recuperer l'attribut data-numButton 
      if (!mySound.paused) {
        if (element.classList.contains("pause")) {
          element.classList.replace("pause", "play");
        }
          mySound.pause();
      }else{
        if (element.classList.contains("play")) {
          element.classList.replace("play", "pause");
        }
          mySound.play();
      }
    };

    var nextButton = function() {
        console.log("You click on Next Button");
        //A faire quand y aura des playlist
    };

    var volumeButton = function() {
        var volumeControl = document.querySelector('.vol-control');
        if (volumeControl.classList.contains("hidden")) {
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
        mySound.setVolume(element.value);
    };

//--------------------------Add Event Listener----------------------------------

    var addButtonListener = function() {
        document.querySelector(".prev").addEventListener("click", function() {
            prevButton();
        });
        document.querySelector("button[class~='play-pause']").addEventListener("click", function(e) {
            playPauseButton(e.target);
        });
        document.querySelector(".next").addEventListener("click", function() {
            nextButton();
        });
        document.querySelector(".volume").addEventListener("click", function() {
            volumeButton();
        });
    };

    var addVolumeControl = function() {
        var volumeControl = document.createElement('input');
        volumeControl.setAttribute('class', 'vol-control hidden');
        volumeControl.setAttribute('type', 'range');
        volumeControl.setAttribute('value', '100');
        volumeControl.setAttribute('min', '0');
        volumeControl.setAttribute('max', '100');
        volumeControl.setAttribute('step', '4');
        volumeControl.style.visibility = "hidden";
        //volumeControl.style.display = "none";

        volumeControl.addEventListener("change", function(e) {
            volumeChanged(e.target);
        });

        document.querySelector('.controls').appendChild(volumeControl);
    };

    var mySound = sound.getMySound();

    this.updateSound = function(sound){
      mySound=sound.getMySound();
    }

    this.playPauseListener = playPauseButton;

    addVolumeControl();
    addButtonListener();

}
