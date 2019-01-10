function Sound(url) {

//-----------------------------Sound Generation---------------------------------
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
                        //A commenter (TOUT le code également)
                        var currentTimeElement = document.querySelector(".temps .en-cours");
                        while (currentTimeElement.firstChild) {
                            currentTimeElement.removeChild(currentTimeElement.firstChild);
                        }

                        var minute = parseInt((mySound.position/1000)/60);
                        var seconde = Math.round(((mySound.position/1000)%60));
                        if (seconde < 10) {
                            seconde = "0"+seconde;
                        }
                        var duration = minute + " : " + seconde;

                        var content = document.createTextNode(duration);
                        currentTimeElement.appendChild(content);

                        var rectTab = document.querySelectorAll(".rect");
                        var target = rectTab[Math.round(this.position / (mySound.duration / rectTab.length))];
                        //console.log((mySound.position/1000).toFixed(2) + "s");

                        if (target != null) {
                            moveWaveForm(target);
                        }

                    },
                });
            },
        });
        return mySound;
    };

    var moveWaveForm = function(target) {
        var rectTab = document.querySelectorAll(".rect");
        var targetId = parseInt(target.getAttribute('data-numRect'));

        rectTab.forEach(function(element) {
            var rectId = parseInt(element.getAttribute('data-numRect'));

            if (rectId <= targetId) {
                if (!rectTab[rectId].classList.contains("clicked")) {
                    rectTab[rectId].classList.add("clicked");
                }
                if (rectTab[rectId].classList.contains("passed")) {
                    rectTab[rectId].classList.remove("passed");
                }
            }
        });
    };

    var mySound = generation(url);

    this.getMySound = function(){
        return mySound;
    };


}
