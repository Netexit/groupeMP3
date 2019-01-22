var generatePlaylistDom = function(array){
	var divPlaylist = document.createElement("div"); // Element Div qui va comporter la list des music
	divPlaylist.classList.add("playlist"); // Ajout d'une class
	var olElement = document.createElement("ol"); // Element Ol qui lister de 1 a n element
	olElement.classList.add("liste");
	// Boucle pour generer les Element pour chaque musique compris de le tableau passer en Param de function
	for (var i = 0; i < array.length; i++) {
			var liElement = document.createElement("li"); // Element li qui represente une music dans la liste
			var buttonElement = document.createElement("button"); // Element button qui permetra de Play/pause la music
			var divTitre = document.createElement("div"); // Element Div pour afficher le titre de la music
			var divArtiste = document.createElement("div"); // Element Div pour afficher l'artiste de la music

			// Ajout de class pour la gestion des style
			liElement.classList.add("element");
			buttonElement.classList.add("play-pause");
			buttonElement.setAttribute("data-numButton", i);
			divTitre.classList.add("titre");
			divArtiste.classList.add("artiste");
			// Si i = 0 (premiere musique de la liste) on lui donne des classe specifique
			if(i == 0){
				liElement.classList.add("selected");
				buttonElement.classList.add("pause");
			}else {
				liElement.classList.add("not-selected");
				buttonElement.classList.add("play");
			}

			// Ajout de Titre et nom Artiste dans les div respetive
			var content = document.createTextNode(array[i].nomPlage)
			divTitre.appendChild(content);
			content = document.createTextNode(array[i].nomArtiste)
			divArtiste.appendChild(content);
			// Ajout des Element a leur parent
			liElement.appendChild(buttonElement);
			liElement.appendChild(divTitre);
			liElement.appendChild(divArtiste);

			olElement.appendChild(liElement);
		}
		// Ajout de tous Elements  crée précedement dans l'element Ol puis celui-ci dans le body
		divPlaylist.appendChild(olElement);

		document.querySelector(".audioplayer").appendChild(divPlaylist);
};
