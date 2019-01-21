function SoundWaveform(sound, soundData){

//-------------------------------WaveForm---------------------------------------

    var init = function(tabs) {
        drawWaveForm(tabs);
    };


    var perfectSize = function(width, height){

        var nb = ( ((width-(width%4))-8)/4 ) - 1;
        var json = soundData.getJson();
        var i;
        // console.log("NB : " + nb);
//---------------Initialise le tableau agrandi des Data de la musique-----------
        if (dataHighSize.length == 0){
            for (var j = 0; j < json.length; j++) {
                for (var g = 0; g < 6; g++){
                    dataHighSize[g+(6*j)] = json[j];
                }
            }
        }

//--------------------------------Width-----------------------------------------
        // if (nb <= 400) { //Si on veut que la forme d'onde prennent toujours la taille max alors retirer cette condition

            var newTabs = json;
            if (nb == 0) {
                console.log("nb = 0");
                var arrayVide = [];
                return arrayVide;
            }
            // // Si on veut que la forme d'onde prennent toujours la taille max même supérieur a 400 !!
            // else if (nb > json.length) {
            //     return json;
            // }

            newTabs = dataHighSize;
            //newTabs -> 2400 valeur -> 400*6

            array = [];
            var diviseur = parseInt(newTabs.length / nb);
            //Diviseur represente la taille des groupe qu'il faut réaliser afin d'obtenir le nombre de baton shouaiter
            var separator =  nb - ( newTabs.length - (nb * diviseur) )  ;
            //Separator represente le moment ou l'on augment la taille des groupe afin d'obtenir le bon nombre de baton sans oublier certaine valeur

            // console.log("Diviseur : " + diviseur);
            // console.log("Separator : " + separator);

            for (var j = 0; j < nb; j++) {
                var somme = 0;
                var nbSomme = 0;
                var limite;

                if (j < separator) {
                    limite = diviseur;
                }else {
                    limite = diviseur + 1;
                }

                for (var g = 0; g < limite; g++){
                    var k = g+(diviseur*j);
                    somme += newTabs[k];
                    nbSomme++;
                }
                array[j] = somme/nbSomme;
            }

            newTabs = array;
            //Peut etre simplifier
            json = newTabs;
        // }
//--------------------------------Height----------------------------------------
        var max = 0;
        for(i = 0; i < json.length; i++){
            if(json[i] > max){
                max = json[i];
            }
        }
        var coef = ( (height-10) /2)/max;
        for(i = 0; i < json.length; i++){
            if (json[i] <= 1) {
                json[i] = 1;
            } else {
                json[i] = Math.round(json[i] * coef);
            }
        }

        // console.log(json);
        return json;
    };

    var drawWaveForm = function(){
        var pSVG = document.querySelector(".waveform");
        while (pSVG.firstChild) {
            pSVG.removeChild(pSVG.firstChild);
        }

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        svg.classList.add("svg");

        var tmp = document.documentElement.querySelector(".waveform");
        var paddingLeftSize = parseInt(window.getComputedStyle(tmp, null).getPropertyValue('padding-left'));


        var width =  tmp.clientWidth-paddingLeftSize;
        var height =  tmp.clientHeight;

        var tabs = perfectSize(width, height);



        for (var i = 0; i < tabs.length; i++) {
            var rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', 4 * (i + 1));
            rect.setAttribute('y', 5 + ( ( (height-10) /2) - tabs[i]) );
            rect.setAttribute('width', 3);
            rect.setAttribute('height', tabs[i] * 2);
            rect.setAttribute('class', 'rect');
            rect.setAttribute('data-numRect', i);

            rect.addEventListener("mouseover", function(e) {
                hoverTab(e.currentTarget);
            });

            rect.addEventListener("click", function(e) {
                clickTab(e.currentTarget);
            });
            svg.appendChild(rect);
        }
        pSVG.appendChild(svg);

    };

    var clearPlayer = function(){
        var svg = document.querySelector(".svg");
        svg.parentNode.removeChild(svg);
        // var rectTab = document.querySelectorAll(".rect");
        // rectTab.forEach(function(element) {
        //     element.parentNode.removeChild(element);
        // });
        this.mySound.destruct();
        mySound.destruct();
    };

//-------------------------WaveForm Listener------------------------------------

    var clickTab = function(target) {
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
            } else {
                if (rectTab[rectId].classList.contains("clicked")) {
                    rectTab[rectId].classList.remove("clicked");
                }
                if (rectTab[rectId].classList.contains("passed")) {
                    rectTab[rectId].classList.remove("passed");
                }
            }

            console.log(mySound.duration);
            console.log(rectTab.length);
            // var position = targetId * (mySound.duration / rectTab.length);
            var position = (targetId / rectTab.length) * (mySound.duration );
            console.log(position);
            // console.log(mySound.duration);
            mySound.setPosition(position);
            // console.log("SET Time : " + mySound.position/1000 + "s");


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

    var mySound = sound.getMySound();
    var json = soundData.getJson();
    var dataHighSize = [];



    this.drawWaveForm = drawWaveForm;
    init(json.data);
}
