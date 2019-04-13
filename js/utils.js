function constructLine(myArray){
	var myLine = document.createElement("tr");
	// if myArray contains arrays (not strings or numbers)
	if(
		(typeof myArray[0] != "string")
		&& (typeof myArray[0] != "number")
	){
		for(var i=0; i<myArray.length; i++){
			for(var j=0; j<myArray[i].length; j++){
				var lineElt = document.createElement("td");
				lineElt.innerHTML = myArray[i][j];
				myLine.appendChild(lineElt);
			}
		}
	}
	// if myArray contains strings or numbers
	else{
		for(var i=0; i<myArray.length; i++){
			var lineElt = document.createElement("td");
			lineElt.innerHTML = myArray[i];
			myLine.appendChild(lineElt);
		}
	}
	
	return myLine;
}

// Testing - simple 2D PGA to start.
    var A = Algebra(4,1);