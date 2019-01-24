var likesCookie = getCookie("likes");
var likesArray=[];
var likesToInsert;
var expiryDate = new Date(Number(new Date()) + 315360000000);
var likeButton = document.querySelector(".like");
var currentSong = 0;
//console.log(musique);

if(musique.length!=1){
  generatePlaylistDom(musique);
}

var setDataNumButton = function(id){
  var mainPlayPauseButton = document.querySelector(".controls button[class~='play-pause']");
  mainPlayPauseButton.setAttribute("data-numButton", id);
};

var switchClass = function(element, x, y){
  if (element.classList.contains(x)) {
    element.classList.replace(x, y);
  }
};

var switchClassPlay = function(id){
  var mainPlayPauseButton = document.querySelector(".controls button[class~='play-pause']");
  var currentSongId = mainPlayPauseButton.getAttribute("data-numButton");
  var secondePlayPauseButton = document.querySelector("ol li button[data-numButton='"+currentSongId+"']");
  switchClass(mainPlayPauseButton, "play", "pause");
  switchClass(playButtonsPlaylist[currentSongId], "pause", "play");
  switchClass(playButtonsPlaylist[id], "play", "pause");
};

var playButtonsPlaylist = document.querySelectorAll("ol li button[class~='play-pause']");
for(var i=0;i<playButtonsPlaylist.length;i++){
  playButtonsPlaylist[i].addEventListener("click",function(e){
    var currentId=e.currentTarget.getAttribute("data-numButton");
    if(currentId!=currentSong){
      switchClass(playButtonsPlaylist[currentSong].parentNode, "selected", "not-selected");
      switchClass(playButtonsPlaylist[currentId].parentNode, "not-selected", "selected");
      switchClassPlay(currentId);
      waveForm.killSound();
      waveForm.updateSound(musique[currentId]);
      currentSong=currentId;
      isLiked();
      setDataNumButton(currentId);
    }
    else{
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

function isLiked(){
  likesCookie = getCookie("likes");
  if(likesArray.indexOf(musique[currentSong]._id)==-1){
    likeButton.classList.add("unlike");
  }
  else{
    if(likeButton.classList.contains("unlike")){
      likeButton.classList.remove("unlike");
    }
  }
}

function init(){
  if(likesCookie!=""){
    if((likesCookie.match(/,/g) || []).length==0)
      likesArray.push(likesCookie);
    else
      likesArray=likesCookie.split(",");
  }
  if(likesArray.indexOf(musique[currentSong]._id)==-1){
    likeButton.classList.add("unlike");
  }
  var url = "http://localhost:3000/listen/"+musique[currentSong]._id;
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
  var urlParams = new URLSearchParams(window.location.search);

  if(urlParams.get('mobile')=="true"){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "/stylesheets/player_mobile.css");
    document.getElementsByTagName("head")[0].appendChild(element);
  }
  else{
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", "/stylesheets/player.css");
    document.getElementsByTagName("head")[0].appendChild(element);
  }

  var share = document.createElement("div");
  share.className="share-pannel hidden";
  var node = document.createElement("p");
  node.classList.add("texte");
  node.innerHTML="Lien de partage : ";
  share.appendChild(node);
  node=document.createElement("input");
  node.classList.add("lien");
  node.value="<iframe src='"+window.location.href+"' width='800' height='600'></iframe>";
  node.readOnly=true;
  node.type="text";
  share.appendChild(node);
  node=document.createElement("button");
  node.classList.add("copier");
  node.addEventListener("click",function(e){
    document.querySelector(".lien").select();
    document.execCommand("copy");
  });
  share.appendChild(node);

  document.querySelector(".social").appendChild(share);

  document.querySelector(".share").addEventListener("click",function(e){
    var pannel = document.querySelector(".share-pannel");
    if(pannel.classList.contains("hidden")){
      pannel.classList.remove("hidden");
      pannel.classList.add("visible");
      document.querySelector(".lien").select();
    }
    else if(pannel.classList.contains("visible")){
      pannel.classList.remove("visible");
      pannel.classList.add("hidden");
    }
  });
}

likeButton.addEventListener("click", function(){
  var index = likesArray.indexOf(musique[currentSong]._id);
  if(index==-1){
    likesArray.push(musique[currentSong]._id);
    var url = "http://localhost:3000/like/"+musique[currentSong]._id;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(null);
    xhr.onload = function(){
      if(xhr.readyState == 4 && xhr.status == "200") {
        console.log("success");
        musique[currentSong].nbLikes++;
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
    var url = "http://localhost:3000/dislike/"+musique[currentSong]._id;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(null);
    xhr.onload = function(){
      if(xhr.readyState == 4 && xhr.status == "200") {
        console.log("success");
        musique[currentSong].nbLikes--;
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

function reset(){
  waveForm.killSound();
  waveForm.updateSound(musique[currentSong]);
  waveForm.playPauseButton();
}

function next(){
  if(currentSong!=musique.length-1){
    currentSong=parseInt(currentSong);
    switchClass(playButtonsPlaylist[currentSong].parentNode, "selected", "not-selected");
    switchClass(playButtonsPlaylist[currentSong+1].parentNode, "not-selected", "selected");
    switchClassPlay(currentSong+1);
    waveForm.killSound();
    waveForm.updateSound(musique[currentSong+1]);
    currentSong=currentSong+1;
    isLiked();
    setDataNumButton(currentSong);
  }
  else{
    switchClass(playButtonsPlaylist[currentSong].parentNode, "selected", "not-selected");
    switchClass(playButtonsPlaylist[0].parentNode, "not-selected", "selected");
    switchClassPlay(0);
    waveForm.killSound();
    waveForm.updateSound(musique[0]);
    currentSong=0;
    isLiked();
    setDataNumButton(currentSong);
  }
}

function previous(){
  if(currentSong==0){
    switchClass(playButtonsPlaylist[currentSong].parentNode, "selected", "not-selected");
    switchClass(playButtonsPlaylist[musique.length-1].parentNode, "not-selected", "selected");
    switchClassPlay(musique.length-1);
    waveForm.killSound();
    waveForm.updateSound(musique[musique.length-1]);
    currentSong=musique.length-1;
    isLiked();
    setDataNumButton(currentSong);
  }
  else{
    switchClass(playButtonsPlaylist[currentSong].parentNode, "selected", "not-selected");
    switchClass(playButtonsPlaylist[currentSong-1].parentNode, "not-selected", "selected");
    switchClassPlay(currentSong-1);
    waveForm.killSound();
    waveForm.updateSound(musique[currentSong-1]);
    currentSong=currentSong-1;
    isLiked();
    setDataNumButton(currentSong);
  }
}

init();
