// fichier permettant le test de l'API REST

var inputFile = document.getElementById("file");

function findAll(){
  var url = "http://localhost:3000/plages";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send(null);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200") {
      document.getElementById("divFindAll").innerHTML=xhr.responseText;
    }
    else{
      console.log("error");
    }
  }
}

function findById(){

  var url = "http://localhost:3000/plages/"+document.getElementById("inputFindById").value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send(null);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200") {
      document.getElementById("divFindById").innerHTML=xhr.responseText;
    }
    else{
      console.log("error");
    }
  }

}

function deletePlage(){

  var url = "http://localhost:3000/plages/"+document.getElementById("inputDeletePlage").value;
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE',url,true);
  xhr.send(null);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200"){
      console.log("Suppression effectuée");
    }
    else{
      console.log("error");
    }
  }

}

function updatePlage(){
  // On se sert du meme champ que pour update une plage
  // Seul le nom de la plage est pris en compte pour une modification
  var url = "http://localhost:3000/plages/"+document.getElementById("inputDeletePlage").value;
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append("nomPlage",document.getElementById("nomPlage").value);
  xhr.open('PUT',url,true);
  xhr.send(formData);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200"){
      console.log("Mise à jour effectuée");
    }
    else{
      console.log("error");
    }
  }

}
