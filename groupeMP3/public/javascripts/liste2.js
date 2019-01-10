var plages = document.querySelectorAll("button");

plages.forEach(function(val){
  val.onclick=function(){
    document.getElementById("iframe").src='/lecteur?id='+val.id;
  };
});
