//console.log(duration);
function createPlage(){

  var url = "http://localhost:3000/countPlages/";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send(null);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200") {
      //console.log(JSON.parse(xhr.response).count);
      var id = JSON.parse(xhr.response).count+1;
      url = "http://localhost:3000/plages/";
      var xhr2 = new XMLHttpRequest();
      formDate.append("id",id);
      formData.append("nomPlage",document.getElementById("nomPlage").value);
      formData.append("duree",duration);

      xhr2.open('POST', url, true);
      xhr2.send(null);
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
