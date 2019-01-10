function SoundInfo(soundData) {

//------------------------------Sound Info--------------------------------------
    var soundInfo = function(){
        var artisteElement = document.querySelector(".infos .artiste");
        var titreElement = document.querySelector(".infos .titre");
        var nbListenElement = document.querySelector(".statistiques .nb-lectures");
        var currentTimeElement = document.querySelector(".temps .en-cours");
        var soundDuraElement = document.querySelector(".temps .total");
        var nbLikeElement = document.querySelector(".social .like");
        var pochetteElement = document.querySelector(".pochette");


        pochetteElement.src=pochette;
        var content;
        content = document.createTextNode(artiste);
        artisteElement.appendChild(content);
        content = document.createTextNode(titre);
        titreElement.appendChild(content);
        content = document.createTextNode(nbListen);
        nbListenElement.appendChild(content);
        content = document.createTextNode(currentTime);
        currentTimeElement.appendChild(content);
        var minute = parseInt((dura)/60);
        var seconde = Math.round(((dura)%60));
        if (seconde < 10) {
            seconde = "0"+seconde;
        }

        var duration = minute + " : " + seconde;
        content = document.createTextNode(duration);
        soundDuraElement.appendChild(content);
        content = document.createTextNode(nbLike + " K");
        nbLikeElement.appendChild(content);
    };

    //Remplacer avec les valeur retourner par la BDD dans le json
    // var json = soundData.getJson();
    // this.artiste = json.artiste;
    // this.titre = json.titre;
    // this.nbListen = json.nbListen;
    // this.nbComment = json.nbComment;
    // this.nbLike = json.nbLike;
    // this.currentTime = json.currentTime;
    // this.soundDura = json.soundDuration;

    //Valeur de test
    var artiste = soundData.nomArtiste;
    var titre = soundData.nomPlage;
    var nbListen = soundData.nbEcoutes;
    var nbLike = soundData.nbLikes;
    var currentTime = "0 : 00";
    var dura = soundData.duree;
    var pochette = soundData.cheminPochette;

    soundInfo();


}
