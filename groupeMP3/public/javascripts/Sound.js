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
                        var rectTab = document.querySelectorAll(".rect");
                        var target = rectTab[Math.round(this.position / (mySound.duration / rectTab.length))];
                        //console.log((mySound.position/1000).toFixed(2) + "s");
                        var currentTimeElement = document.querySelector(".temps .en-cours");
                        if (!currentTimeElement.classList.contains("timeUsed")) {
                            changeCurrentTime();
                        }

                        if (target != null) {
                            moveWaveForm(target);
                        }

                    },
                });
            },
        });
        return mySound;
    };

    var formatTime = function(position){
        var minute = parseInt((position/1000)/60);
        var seconde = Math.round(((position/1000)%60));
        if (seconde < 10) {
            seconde = "0"+seconde;
        }
        var duration = minute + " : " + seconde;

        return duration;
    }


    var changeCurrentTime = function(target){
        var currentTimeElement = document.querySelector(".temps .en-cours");
        while (currentTimeElement.firstChild) {
            currentTimeElement.removeChild(currentTimeElement.firstChild);
        }
        var position;

        var rectTab = document.querySelectorAll(".rect");
        if (typeof target !== "undefined") {
            var targetId = parseInt(target.getAttribute('data-numRect'));
            position = (targetId / rectTab.length) * (mySound.duration);
        }else{
            position = mySound.position;
        }

        var duration = formatTime(position);

        var content = document.createTextNode(duration);
        currentTimeElement.appendChild(content);
    };

    var moveWaveForm = function(target) {
        if (!target.classList.contains("clicked")) {
            target.classList.add("clicked");
        }

        // target.previousSibling.previousSibling retourn l'element deux fois avant le target (2 fois car chaque rect est doublé)
        if (target.previousSibling.previousSibling !== null) {
            if (target.previousSibling.previousSibling.classList.contains("passedBeforePlayed")) {
                target.classList.add("passedBeforePlayed");
            }
        }
        if (target.classList.contains("passed")) {
            target.classList.remove("passed");
        }
    };

    var mySound = generation(url);

    this.changeCurrentTime = function(target){
        changeCurrentTime(target);
    };

    this.getMySound = function(){
        return mySound;
    };


}
