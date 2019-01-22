function SoundWaveform(sound, soundData){

//-------------------------------WaveForm---------------------------------------

    var init = function() {
        drawWaveForm();
    };

    //Fonction qui prend en param Width et Hieght
    //Retourne le Tableau avec la taille parfaite pour repondre au contrainte
    var perfectSize = function(width, height){

        var nb = ( ((width-(width%4))-8)/4 ) - 1;
        var i;
        var j;
        var g;
        // console.log("NB : " + nb);
//---------------Initialise le tableau agrandi des Data de la musique-----------
        if (dataHighSize.length == 0){
            for (j = 0; j < json.length; j++) {
                for (g = 0; g < 6; g++){
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

            for (j = 0; j < nb; j++) {
                var somme = 0;
                var nbSomme = 0;
                var limite;

                if (j < separator) {
                    limite = diviseur;
                }else {
                    limite = diviseur + 1;
                }

                for (g = 0; g < limite; g++){
                    var k = g+(diviseur*j);
                    somme += newTabs[k];
                    nbSomme++;
                }
                array[j] = somme/nbSomme;
            }
            newTabs = array;
            //console.log(json);
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
        var coef = (height-10)/max;
        // console.log(height);
        // console.log(max);
        // console.log(coef);
        for(i = 0; i < json.length; i++){
            if (json[i] < 9) {
                json[i] = 9;
            }else if (json[i] < 18) {
                json[i] = json[i] + Math.floor(Math.random() * 10); //ajoute une une valeur aleatoire entre 0 et 9
             } else {
                json[i] = Math.round(json[i] * coef);
            }
        }

        // console.log(json);
        return json;
    };


//--------------Algo Pour Déterminer les couleur a partir d'une seul------------

//-------------Convertie une valeur HexaDecimale en HSL-------------------------
    var hexToHsl = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);

        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = Math.round(360*h);

        var HSL = new Object({});
        HSL.h=h;
        HSL.s=s;
        HSL.l=l;
        return HSL;
    };

//-----------------------Convertie une valeur HSL en HEX------------------------

    var hslToHex = function(hsl){
        h = hsl.h / 360;
        s = hsl.s / 100;
        l = hsl.l / 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

//-------------------Algo qui calcule les couleur et fais les convertion--------

    var generateGradiantColor = function(hsl){
        var h = hsl.h, s = hsl.s*100, l = hsl.l*100;

        //different palier pour déterminer la couleur suivante
        var h2;
        if (h <= 60) {
            if (60-h < 12){
                h2 = h;
                h = h2 - 12;
            }else{
                h2 = h + 12;
            }
        }else if (h <= 90){
            if (h-12 <= 60) {
                h2 = h;
                h = h2 + 12;
            }else{
                h2 = h - 12;
            }
        }else if (h <= 125) {
            if (h-12 >= 90) {
                h2 = h - 12 - (h-90)/2;
            }else {
                h2 = 100;
            }
        }else if (h <= 180) {
            if (h+20 < 145) {
                h2 = h+24;
            }else if (180-h < 12){
                h2 = h;
                h = h2 -12;
            }
        }else if (h <= 230){
            if (h-12 <= 180) {
                h2 = h;
                h = h2 + 12;
            }else{
                h2 = h - 12;
            }
        }else if (h <= 300) {
            if (300-h < 12) {
                h2 = h;
                h = h2 - 12;
            }else{
                h2 = h + 12;
            }
        }else{
            if (h-12 <= 300) {
                h2 = h;
                h = h2 + 12;
            }else{
                h2 = h - 12;
            }
        }


        var l2;
        if (l <=30) {
            l2 = l+5;
        }else {
            l2 = l+15;
        }
        var colors = {};
        for (var i = 0; i < 8; i++) {
            var a = h, b = s, c = l;
            switch (i) {
                case 1:
                    a = h2;
                    break;
                case 2:
                    c = l2;
                    break;
                case 3:
                    a = h2;
                    c = l2;
                    break;
                case 4:
                    c = l2+5;
                    break;
                case 5:
                    a = h2;
                    c = l2+5;
                    break;
                case 6:
                    c = l2+5+15;
                    break;
                case 7:
                    a = h2;
                    c = l2+5+15;
                    break;
            }

            colors[i] = {
                'h': a,
                's': b,
                'l': c
            };
        }

        for (i = 0; i < 8; i++) {
            colors[i] = hslToHex(colors[i]);
        }

        // console.log(colors);
        return colors;
    };

//--------------------Crée les linearGradient-----------------------------------

    var createGradiantDef = function(){
        var svgNS = "http://www.w3.org/2000/svg";
        var defs = document.createElementNS(svgNS, "defs");
        var ids = [
            'gradiant',
            'gradiantClicked',
            'gradiantPassed'
        ];
        var position = [
            '5%',
            '66%',
            '67%',
            '95%'
        ];

        // var hsl = hexToHsl("#FF00FF");
        var hsl = hexToHsl("#ff6600");
        var colors = generateGradiantColor(hsl);

        //Faire un algo pour déterminer les couleur degrader a partir de la couleur de BASE (La plus foncé/forte)
        var color = [
            [
                'stop-color:#ffffff;stop-opacity:1', //Gradiant normale 1
                'stop-color:#f2f2f2;stop-opacity:1', //Gradiant normale 2
                'stop-color:#e6e6e6;stop-opacity:1', //Gradiant normale 3
                'stop-color:#e6e6e6;stop-opacity:1' //Gradiant normale 4
            ],
            [
                'stop-color:' + colors[1] + ';stop-opacity:1', //Gradiant Clicked 1
                'stop-color:' + colors[0] + ';stop-opacity:1', //Gradiant Clicked 2
                'stop-color:' + colors[2] + ';stop-opacity:1', //Gradiant Clicked 3
                'stop-color:' + colors[3] + ';stop-opacity:1' //Gradiant Clicked 4
            ],
            [
                'stop-color:' + colors[4] + ';stop-opacity:1', //Gradiant Passed 1
                'stop-color:' + colors[5] + ';stop-opacity:1', //Gradiant Passed 2
                'stop-color:' + colors[6] + ';stop-opacity:1', //Gradiant Passed 3
                'stop-color:' + colors[7] + ';stop-opacity:1' //Gradiant Passed 4
            ]
        ];

        for (var i = 0; i < 3; i++) {
            var linearGradient = document.createElementNS(svgNS, "linearGradient");
            linearGradient.setAttribute('id', ids[i]);
            linearGradient.setAttribute('x1', '0%');
            linearGradient.setAttribute('y1', '0%');
            linearGradient.setAttribute('x2', '0%');
            linearGradient.setAttribute('y2', '100%');

            for (var j = 0; j < position.length; j++) {
                var stop = document.createElementNS(svgNS, "stop");

                stop.setAttribute('offset' , position[j]);
                stop.setAttribute('style', color[i][j]);


                linearGradient.appendChild(stop);
            }

            defs.appendChild(linearGradient);
        }


        return defs;
    };

//------------------------------Dessine le waveForm-----------------------------

// Utiliser lors du premier affichage
// et aussi lorsque la fenetre est redimensionner

    var drawWaveForm = function(){
        var waveFormElement = document.querySelector(".waveform");
        while (waveFormElement.firstChild) {
            waveFormElement.removeChild(waveFormElement.firstChild);
        }

        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svgElement.namespaceURI;
        svgElement.classList.add("svg");

        var paddingLeftSize = parseInt(window.getComputedStyle(waveFormElement, null).getPropertyValue('padding-left'));


        var width =  waveFormElement.clientWidth-paddingLeftSize;
        var height =  waveFormElement.clientHeight;

        var tabs = perfectSize(width, height);



        var defs = createGradiantDef();

        svgElement.appendChild(defs);

        for (var i = 0; i < tabs.length; i++) {
            var rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', 4 * (i + 1));
            rect.setAttribute('y', parseInt( 5 +  (height-10) - ((height-10)/3) - ( (2*tabs[i])/3) ) );
            rect.setAttribute('width', 3);
            rect.setAttribute('height', tabs[i]);
            rect.setAttribute('class', 'rect');
            rect.setAttribute('data-numRect', i);

            svgElement.appendChild(rect);

            //Creer un rectangle invisible par dessu les rect de la fomr ed'onde pour un selection plus efficace
            rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', 4 * (i + 1));
            rect.setAttribute('y', 0);
            rect.setAttribute('width', 3);
            rect.setAttribute('height', (height-10) );
            rect.setAttribute('class', 'rectNotRender');
            rect.setAttribute('data-numRect', i);

            rect.addEventListener("mouseover", function(e) {
                monTimeOut2.forEach(function(element){
                    clearTimeout(element);
                });
                monTimeOut2 = [];
                clearTimeout(monTimeOut);
                hoverTab(e.currentTarget);
                //Quelque souci au niveau des time out A revoir
                monTimeOut = setTimeout(function(){ waveFormHoverOut(); }, 5000);
            });

            rect.addEventListener("click", function(e) {
                clickTab(e.currentTarget);
            });
            svgElement.appendChild(rect);
        }

        var rectSeparator = document.createElementNS(svgNS, 'rect');
        rectSeparator.setAttribute('x', 0);
        rectSeparator.setAttribute('y', Math.round( 5 +  (height-10) - ((height-10)/3) )-1 );
        rectSeparator.setAttribute('width', width);
        rectSeparator.setAttribute('height', 2);
        rectSeparator.setAttribute('class', 'rectSeparator');

        svgElement.appendChild(rectSeparator);
        waveFormElement.appendChild(svgElement);

        waveFormElement.addEventListener("mouseleave", function(e) {
            clearTimeout(monTimeOut);
            waveFormHoverOut();
        });

        var rectTab = document.querySelectorAll(".rect");
        var target = rectTab[Math.round(mySound.position / (mySound.duration / rectTab.length))];
        if (typeof target !== "undefined") {
            moveWaveFormBackUp(target);
        }
    };

// Supprime les musiques et le waveform

    var clearPlayer = function(){
        var svg = document.querySelector(".svg");
        svg.parentNode.removeChild(svg);
        // var rectTab = document.querySelectorAll(".rect");
        // rectTab.forEach(function(element) {
        //     element.parentNode.removeChild(element);
        // });
        mySound.destruct();
    };

//-------------------------WaveForm Listener------------------------------------

//Bouge le waveForm jusqu'a l'element target (Clicked)
    var moveWaveFormBackUp = function(target){
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
                if (rectTab[rectId].classList.contains("passedBeforePlayed")) {
                    rectTab[rectId].classList.remove("passedBeforePlayed");
                }
            }
        });
    };

    var removeClassPassed = function(target){
        if (target.classList.contains("passedBeforePlayed")) {
            target.classList.remove("passedBeforePlayed");
        }
        if (target.classList.contains("passed")) {
            target.classList.remove("passed");
        }
    };

    var removeClass = function(target){
        removeClassPassed(target);
        if (target.classList.contains("clicked")) {
            target.classList.remove("clicked");
        }
    };

    var addClassClicked = function(target){
        if (!target.classList.contains("clicked")) {
            target.classList.add("clicked");
        }
        if (target.classList.contains("passed")) {
            target.classList.remove("passed");
        }
    };


//Bouge le waveForm jusqu'a l'element target (Clicked)
    var moveWaveForm = function(target){
        var rectTab = document.querySelectorAll(".rect");
        var targetId = parseInt(target.getAttribute('data-numRect'));
        var lastRectClickedId = rectTab[Math.round(mySound.position / (mySound.duration / rectTab.length))].getAttribute('data-numRect');
        var i;
        var tmp = 1;
        var time;

        if (targetId < lastRectClickedId) {
            for (i = lastRectClickedId; i > targetId ; i--) {
                time = 2*tmp; // 2ms fois tmp si je retire le 3 eme element je doit lui mettre un timeout de 6ms afin que la difference entre chaque element soit de de 2ms
                setTimeout(function(rectTab){ removeClass(rectTab); }, time, rectTab[i]);
                tmp++;
            }
        }else {
            for (i = lastRectClickedId; i < targetId ; i++) {
                time = 2*tmp;
                setTimeout(function(rectTab){ addClassClicked(rectTab); }, time, rectTab[i]);

                tmp++;
            }
        }
    };


    var clickTab = function(target) {
            var rectTab = document.querySelectorAll(".rect");
            var targetId = parseInt(target.getAttribute('data-numRect'));
            moveWaveForm(target);
            // console.log(mySound.duration);
            // console.log(rectTab.length);
            // var position = targetId * (mySound.duration / rectTab.length);
            var position = (targetId / rectTab.length) * (mySound.duration );
            // console.log(position);
            // console.log(mySound.duration);
            mySound.setPosition(position);
            // console.log("SET Time : " + mySound.position/1000 + "s");

    };

    var hoverTab = function(target) {
        var rectTab = document.querySelectorAll(".rect");
        var targetId = parseInt(target.getAttribute('data-numRect'));

        var currentTimeElement = document.querySelector(".temps .en-cours");
        if (!currentTimeElement.classList.contains("timeUsed")) {
            currentTimeElement.classList.add("timeUsed");
        }
        sound.changeCurrentTime(target);

        rectTab.forEach(function(element) {
            var rectId = parseInt(element.getAttribute('data-numRect'));

            if (rectId <= targetId) {
                if (!rectTab[rectId].classList.contains("clicked")) {
                    rectTab[rectId].classList.add("passed");
                }
                if (rectTab[rectId].classList.contains("clicked")) {
                    if (rectTab[rectId].classList.contains("passed")) {
                        rectTab[rectId].classList.remove("passed");
                    }
                }
                if (rectTab[rectId].classList.contains("passedBeforePlayed")) {
                    rectTab[rectId].classList.remove("passedBeforePlayed");
                }
                if (rectId == targetId) {
                    if (rectTab[rectId].classList.contains("clicked")) {
                        rectTab[rectId].classList.add("passedBeforePlayed");
                    }else{
                        rectTab[rectId].classList.add("passed");
                    }
                }
            } else {
                if (!rectTab[rectId].classList.contains("clicked")) {
                    if (rectTab[rectId].classList.contains("passed")) {
                        rectTab[rectId].classList.remove("passed");
                    }
                } else {
                    rectTab[rectId].classList.add("passedBeforePlayed");
                }
            }
        });
    };

    var waveFormHoverOutBackup = function(){
        var rectTab = document.querySelectorAll(".rect");
        var currentTimeElement = document.querySelector(".temps .en-cours");
        if (currentTimeElement.classList.contains("timeUsed")) {
            currentTimeElement.classList.remove("timeUsed");
        }
        var lastRectClicked = rectTab[Math.round(mySound.position / (mySound.duration / rectTab.length))];
        sound.changeCurrentTime(lastRectClicked);

        rectTab.forEach(function(element) {
            var rectId = parseInt(element.getAttribute('data-numRect'));

            if (rectTab[rectId].classList.contains("passed")) {
                rectTab[rectId].classList.remove("passed");
            }

            if (rectTab[rectId].classList.contains("passedBeforePlayed")) {
                rectTab[rectId].classList.remove("passedBeforePlayed");
            }
        });
    };

    var waveFormHoverOut = function(){
        var rectTab = document.querySelectorAll(".rect");

        var currentTimeElement = document.querySelector(".temps .en-cours");
        if (currentTimeElement.classList.contains("timeUsed")) {
            currentTimeElement.classList.remove("timeUsed");
        }

        // recupere le tempsdonner par le Hover afin de determiner le dernier element hovered
        var res = currentTimeElement.textContent.split(":");
        var timeHover = ( res[0]*60 + parseInt(res[1]) )*1000;
        var lastRectHover =  rectTab[Math.round(timeHover / (mySound.duration / rectTab.length))];

        var lastRectClicked = rectTab[Math.round(mySound.position / (mySound.duration / rectTab.length))];
        sound.changeCurrentTime(lastRectClicked);

        var lastRectHoverId = lastRectHover.getAttribute('data-numRect');
        var lastRectClickedId = lastRectClicked.getAttribute('data-numRect');
        var i;
        var tmp = 1;
        var time;

        if (lastRectHoverId <= lastRectClickedId) {
            for (i = lastRectHoverId; i <= lastRectClickedId ; i++) {
                time = 2*tmp; // 2ms fois tmp si je retire le 3 eme element je doit lui mettre un timeout de 6ms afin que la difference entre chaque element soit de de 2ms
                monTimeOut2[tmp-1] = setTimeout(function(rectTab){ removeClassPassed(rectTab); }, time, rectTab[i]);
                tmp++;
            }
        }else {
            for (i = lastRectHoverId; i > lastRectClickedId ; i--) {
                time = 2*tmp;
                monTimeOut2[tmp-1] = setTimeout(function(rectTab){ removeClassPassed(rectTab); }, time, rectTab[i]);

                tmp++;
            }
        }

    };

    var mySound = sound.getMySound();
    var json = soundData.getJson();
    var dataHighSize = [];
    var monTimeOut;
    var monTimeOut2 = [];

    this.killSound = clearPlayer;

    this.updateSound = function(sound, soundData){
      mySound = sound.getMySound();
      json = soundData.getJson();
      dataHighSize = [];
      init();
    }

    this.drawWaveForm = drawWaveForm;
    init();
}
