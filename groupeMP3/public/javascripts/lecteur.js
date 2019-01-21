var likesCookie = getCookie("likes");
var likesArray=[];
var likesToInsert;
var expiryDate = new Date(Number(new Date()) + 315360000000);

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
  if(likesArray.indexOf(musique[0]._id)!=-1)
    document.getElementById('like').innerHTML="Je n'aime plus";
}

function like(){
  var index = likesArray.indexOf(musique[0]._id);
  if(index==-1){
    likesArray.push(musique[0]._id);
    document.getElementById('like').innerHTML="Je n'aime plus";
  }
  else{
    likesArray.splice(index,1);
    document.getElementById('like').innerHTML="J'aime";
  }
  console.log(likesArray);
  if(likesArray.length!=1)
    likesToInsert=likesArray.join(",");
  else
    likesToInsert=likesArray[0];
  document.cookie="likes="+likesToInsert+";expires="+expiryDate.toGMTString()+";path=/";
  console.log(document.cookie);
}

//var aff = document.getElementById("aff");
//aff.innerHTML=musique[0].nomPlage;

init();
//document.cookie="likes=";

/*
div(id='aff')
br
br
button(id='like' onclick='like()') J'aime
div(id='status')
br
br
*/
