var updateNbLike = function(x){
    var nbLikeElement = document.querySelector(".social .like");
    var nbLike = parseInt(nbLikeElement.textContent);

    var content = document.createTextNode(nbLike + x);
    while (nbLikeElement.firstChild) {
        nbLikeElement.removeChild(nbLikeElement.firstChild);
    }
    nbLikeElement.appendChild(content);
};
