function Player(musique) {

    this.resizeWaveForm = function() {
        soundWaveform.drawWaveForm();
    };

    //jsonURL sera remplcer par l'id de la musique pour la requete en BDD

    var soundData = new SoundData(musique.dataJSON);//données JSON

    //url sera contenenue dans SoundData
    // var url = this.soundData.getJson().url;

    var sound = new Sound(musique.cheminMP3);//chemin musique

    var soundInfo = new SoundInfo(musique);

    var soundController = new SoundController(sound);

    var soundWaveform = new SoundWaveform(sound, soundData);


    this.updateSound = function(song){
      soundData = new SoundData(song.dataJSON);

      sound = new Sound(song.cheminMP3);

      console.log(sound.getMySound());

      soundInfo = new SoundInfo(song);

      soundController.updateSound(sound);

      soundWaveform.updateSound(sound, soundData);
    }

    this.killSound = soundWaveform.killSound;
    this.playPauseButton = soundController.playPauseListener;

    //Cree des class pour Player : Info, Button, WaveForm;qs
}
