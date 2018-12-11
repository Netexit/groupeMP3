// La fonction qui permet de nettoyer les valeurs négatives des hauteurs d'un objet JSON
function clean(tab){
	var arrayTab = Array.from(tab)
	for(i=3; i< arrayTab.length ; i= i+4){
		tab[i] = 0;
	}
	arrayTabFilter = tab.filter(function (el) {
		return el != null;
	});	
	return arrayTabFilter;
}

function getPixelsTab(array){
	var tmp = [];
	var i=0;
		do{
		//console.log(array[45]);
		array[i]=([array[i],array[i+1],array[i+2]]);
		array.splice(i,2);
		console.log(array.length);
		i++;
	}while(array.length >i);
	console.log(array);
}



var getPixels = require("get-pixels");

getPixels("img1.png", function(err, pixels) {
  if(err) {
    console.log("Bad image path")
  }
  var pixels = pixels.data;
  
  //var pixels = JSON.parse(pixels);
  //pixels = clean(pixels);
  console.log(pixels.length);
  //console.log(pixels);
  var px = clean(pixels);
  console.log(px);
  console.log(px.length);
  console.log(px);
})

function majorColor(array){
	if(array.length > 8){
		majorColor();
	}
}
