var likesCookie = getCookie("likes");
var likesArray=[];
var likesToInsert;
var expiryDate = new Date(Number(new Date()) + 315360000000);
var likeButton = document.querySelector(".like");
var currentSong = 0;
console.log(musique);

if(musique.length!=1){
  generatePlaylistDom(musique);
}

var playButtonsPlaylist = document.querySelectorAll("ol li button[class~='play-pause']");
for(var i=0;i<playButtonsPlaylist.length;i++){
  playButtonsPlaylist[i].addEventListener("click",function(e){
    var currentId=e.currentTarget.getAttribute("data-numButton");
    if(currentId!=currentSong){
      waveForm.killSound();
      waveForm.updateSound(musique[currentId]);
      currentSong=currentId;
    }
    else{
      document.querySelector(".controls button[class~='play-pause']").setAttribute("data-numButton", currentId);
      waveForm.playPauseButton();
    }
  },true);
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  else return ""
};

function init(){
  if(likesCookie!=""){
    if((likesCookie.match(/,/g) || []).length==0)
      likesArray.push(likesCookie);
    else
      likesArray=likesCookie.split(",");
  }
  if(likesArray.indexOf(musique[0]._id)==-1){
    likeButton.classList.add("unlike");
  }
  var url = "http://localhost:3000/listen/"+musique[0]._id;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.send(null);
  xhr.onload = function(){
    if(xhr.readyState == 4 && xhr.status == "200") {
      console.log("success");
    }
    else{
      console.log("error");
    }
  }
}

likeButton.addEventListener("click", function(){
  var index = likesArray.indexOf(musique[0]._id);
  if(index==-1){
    likesArray.push(musique[0]._id);
    var url = "http://localhost:3000/like/"+musique[0]._id;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(null);
    xhr.onload = function(){
      if(xhr.readyState == 4 && xhr.status == "200") {
        console.log("success");
      }
      else{
        console.log("error");
      }
    }
    likeButton.classList.remove("unlike");
    updateNbLike(1);
  }
  else{
    likesArray.splice(index,1);
    var url = "http://localhost:3000/dislike/"+musique[0]._id;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(null);
    xhr.onload = function(){
      if(xhr.readyState == 4 && xhr.status == "200") {
        console.log("success");
      }
      else{
        console.log("error");
      }
    }
    likeButton.classList.add("unlike");
    updateNbLike(-1);
  }
  if(likesArray.length!=1)
    likesToInsert=likesArray.join(",");
  else
    likesToInsert=likesArray[0];
  document.cookie="likes="+likesToInsert+";expires="+expiryDate.toGMTString()+";path=/";
  console.log(document.cookie);
});

init();
