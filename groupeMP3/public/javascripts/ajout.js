// Ce fichier n'est que ressource de documentation.
// Il n'est pas utilisé dans le projet.
// Le process de construction d'objet pour ajouter une plage ou en modifier une est exécuté côté serveur pour réduire au maximum le nombre d'opérations client.

//console.log(duration);
function createPlage(){

  var url = "http://localhost:3000/countPlages/"; // fonction qui à l'origine retournait un count des rows de la collection. Elle servait à trouver notre propre id pour les plages.
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send(null);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200") {
      //console.log(JSON.parse(xhr.response).count);
      var id = JSON.parse(xhr.response).count+1;
      url = "http://localhost:3000/plages/";
      var xhr2 = new XMLHttpRequest(); // Création de la structure de l'objet à ajouter dans la base
      formData.append("id",id); // append("column", value);
      formData.append("nomPlage",document.getElementById("nomPlage").value);
      formData.append("duree",duration);

      xhr2.open('POST', url, true);
      xhr2.send(null); //send formData
      xhr2.onload = function(){
        if(xhr2.readyState == 4 && xhr2.status == "200") {
          console.log("Ajout effectué");
        }
        else{
          console.log("error");
        }
      }
    }
    else{
      console.log("error");
    }
  }
  alert("yo");
}
