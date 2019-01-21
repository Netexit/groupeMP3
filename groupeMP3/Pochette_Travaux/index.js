// La fonction qui permet de nettoyer les valeurs négatives des hauteurs d'un objet JSON
function clean(tab){
	var arrayTab = Array.from(tab)
	for(i=3; i< arrayTab.length ; i= i+4){
		//arrayTab[i] = 0;
		arrayTab.splice(i,1);
		console.log(i);
	}
	//arrayTabFilter = tab.filter(function (el) {
		//return el != null;
	//});	
	//return arrayTabFilter;
	return arrayTab;
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
  var pixels = Array.from(pixels)
  console.log(pixels.length);
  majorColor(pixels);

})

function majorColor(array){
	console.log("premier "+array.length);
	console.log(array[ 0, array.length/2  ]);
	if(array.length > 8){
		return majorColor( array[ 0, array.length/2 -1 ] ) + majorColor( array[ (array.length/2 -1) , array.length-1 ]);
		
	}else{
		return 2;
	}
}
	
