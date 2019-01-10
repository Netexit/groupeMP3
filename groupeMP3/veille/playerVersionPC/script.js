/*
  var volumeBar = document.createElement("input");
  volumeBar.setAttribute("type", "range");
  volumeBar.setAttribute("class", "volumeBar");
  volumeBar.setAttribute("min", "0");
  volumeBar.setAttribute("max", "100");

  var volume = document.getElementsByClassName("volume");
  volume[0].appendChild(volumeBar);
*/
  /*
  var img = document.createElement("img");
  img.src = "pochette.jpg";
  var visuel = document.getElementsByClassName("visuel");
  visuel[0].appendChild(img);
  */

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "k", "M", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}


function insererInfos(artiste, titre, duree, lectures, commentaires, likes) {
  var artisteDiv = document.getElementsByClassName("artiste");
  var titreDiv = document.getElementsByClassName("titre");
  var dureeDiv = document.getElementsByClassName("total");
  var lecturesDiv = document.getElementsByClassName("nb-lectures");
  var commentairesDiv = document.getElementsByClassName("nb-commentaires");
  var likesDiv = document.getElementsByClassName("like");


  artisteDiv[0].innerHTML = artiste;
  titreDiv[0].innerHTML = titre;
  dureeDiv[0].innerHTML = duree;

  lecturesDiv[0].innerHTML = abbrNum(lectures, 1);
  commentairesDiv[0].innerHTML = abbrNum(commentaires, 1);
  likesDiv[0].innerHTML = abbrNum(likes, 1);

}
