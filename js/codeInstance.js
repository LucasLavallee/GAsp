//Singleton Class

class CodeInstance{
	constructor(algebra){
			this._algebra = algebra;
			this._definition = [];
			this._object = [];
			this._display = [];
			this._options= []; //tab[0]["name"] et tab[0]["value"]  { width, height, animate, camera, scale, grid, canvas }
		/*if(! CodeInstance.instance){
			this._algebra = algebra;
			this._definition = [];
			this._object = [];
			this._display = [];
			this._options= []; //tab[0]["name"] et tab[0]["value"]
			CodeInstance.instance = this;	
		}
		return CodeInstance.instance;*/
	}

	//SETTERS

	//METHODS
	addDefinition(def) {
		this._definition.push(def);
	}
	addObject(object) {
		this._object.push(object);
	}
	addOption(name, value){
		var arr = {"name":name, "value":value};
		this._options.push(arr);
	}
	addDisplay(disp){
		this._display.push(disp);
	}

	/*
		Method debugObj
		Brief: Debugging method that display the current Instance data in the console 
	*/
	debugObj(){
		console.log("this._algebra = " + this._algebra);
		console.log("this._definition = " + this._definition);
		console.log("this._object = " + this._object);
		console.log("this._display = " + this._display);
		console.log("this._options = " + this._options);
	}

	/* 
		Method displayAll
		Brief: display all the js code of the current CodeInstance 
		Return: js code of the current CodeInstance (definition + creation + graph) 
	*/
	displayAll(){
		var globalOffset = "\t";
		var all = "Algebra(";
		for(var i = 0; i<this._algebra.length;i++) 
			all += this._algebra[i] + ",";
		all += "()=>{\n";

		//Writting the definition part (point,line,plane...)
		for(var i =0; i<this._definition.length;i++){
			if(this._definition[i].slice(0,2)== "//") all+= "\n";
			all += globalOffset + this._definition[i].trim() + "\n"; 
		}

		//Writting the creation of objects
		for(var i =0; i<this._object.length;i++){
			if(this._object[i].slice(0,2)== "//") all+= "\n";
			if(i!=0 && this._object[i-1].slice(-1)== ",") all+= "\t";
			all += globalOffset + this._object[i].trim()+ "\n"; 
		}

		//Graph the objects
		all += globalOffset + "document.getElementById('viewer').appendChild(this.graph(()=>{\n";

		for(var i = 0; i<this._display.length;i++){
			if(this._display[i].slice(0,2)== "//") all+= "\n";
			if(i!=0 && this._display[i-1].slice(-1)== ",") all+= "\t";
			all+= globalOffset + "\t" + this._display[i].trim() +"\n";
		}

		all += globalOffset+"}";

		//display the options
		if(this._options.length > 0){
			all += ",{";
			for(var i = 0; i<this._options.length;i++){
				if(this._options[i]["value"] != false)
					all+=this._options[i]["name"] + ":" + this._options[i]["value"];
				else 
					all+=this._options[i]["name"];
				if(i!=this._options.length-1)
					all+=",";
			}
			all += "}";
		}
		all += "));\n});";
		return all;
	}

	/* 
		Method fillInstance
		Brief: fill the current codeInstance with the sourceCode given 
	*/
	fillInstance(sourceCode){

	}
}	



//GA Viewer

/*radius = 3;

center1 = c3ga_point( 2*e1);

center2 = c3ga_point(-2*e1);

sphere  = yellow(dual((center1 - radius*radius*0.5*einf))),

plane   = red(dual(center1-center2)),

circle  = dual( dual(sphere) ^ dual(plane) ),*/

//GAsp

/*Algebra(4,1,()=>{ 

// We start by defining a null basis, and upcasting for points
  var ni = 1e4+1e5, no = .5e5-.5e4;
  var point = (x,y,z)=> no + x*1e1 + y*1e2 + z*1e3 + .5*(x*x+y*y+z*z)*ni;
  
  var radius = 3;
  var center1 = point(2,0,0);
  var center2 = point(-2,0,0);
  var S  = ()=>!(center1- radius*radius*.5*ni);
  
  var P  = !(center1-center2); 
  var C1 = ()=>S&P;
  
  
// Graph the items.  
  document.getElementById("viewer").appendChild(this.graph([
      0x00FF0000, center1, "c1",
      0x00FF0000, center2, "c2", // points
      0xE00000FF, S, "S&P",       // sphere
      0xE0FF0000, P, "plane",
      0xE0000FF00, C1, "Inter"
  ],{conformal:true,gl:true,grid:true})); 
});*/