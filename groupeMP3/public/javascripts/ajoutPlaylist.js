function creation(){
  var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
  var url = "http://localhost:3000/playlist/";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  var fd = new FormData();
  var ids = "";
  for(var i=0;i<checkedBoxes.length;i++){
    if(i==checkedBoxes.length-1)
      ids+=checkedBoxes[i].id;
    else
      ids+=checkedBoxes[i].id+",";
  }
  fd.append("ids",ids);
  xhr.send(fd);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200") {
      //console.log(JSON.parse(xhr.responseText)[0].nomPlage);
    }
    else{
      console.log("error");
    }
  }
}
