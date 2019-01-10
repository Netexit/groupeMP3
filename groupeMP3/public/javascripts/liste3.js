var plages = document.querySelectorAll("button");

plages.forEach(function(val){
  val.onclick=function(){
    var url = "http://localhost:3000/plages/"+val.id;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(null);
    xhr.onload = function(){
      if(xhr.readyState == 4 && xhr.status == "200") {
        console.log(JSON.parse(xhr.responseText)[0].nomPlage);
      }
      else{
        console.log("error");
      }
    }
  }
});


function addToPlaylist(){

}
