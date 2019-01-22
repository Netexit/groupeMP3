var plages = document.querySelectorAll("button");

plages.forEach(function(val){
  val.onclick=function(){
    window.location.href='/lecteur?idPlaylist='+val.id;
  };
});
