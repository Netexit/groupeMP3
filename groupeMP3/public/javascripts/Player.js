function Player(musique) {

    this.resizeWaveForm = function() {
        soundWaveform.drawWaveForm();
    };


    //jsonURL sera remplcer par l'id de la musique pour la requete en BDD

    var soundData = new SoundData(musique[0].dataJSON);//données JSON

    //url sera contenenue dans SoundData
    // var url = this.soundData.getJson().url;

    var sound = new Sound(musique[0].cheminMP3);//chemin musique

    var soundInfo = new SoundInfo(musique[0]);

    var soundController = new SoundController(sound);

    var soundWaveform = new SoundWaveform(sound, soundData);

    //Cree des class pour Player : Info, Button, WaveForm;qs
}
