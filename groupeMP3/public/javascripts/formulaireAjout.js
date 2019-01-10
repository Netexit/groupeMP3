var pochette = document.getElementById("pochette");

function readImg(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("visualisation").src=e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}

pochette.onchange = function(){
  readImg(this);
}
