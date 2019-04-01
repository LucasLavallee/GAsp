class GA{
	constructor(name, dimensions, basis, metric, vectorsDef, pointDef){
		this.name = name;
		this.dimensions = dimensions;
		this.basis = basis; // '1','e12','e13','e23'
		this.metric = metric; //ex : 1,1,1,-1
		this.vectorsDef = vectorsDef; 
		this.pointDef = pointDef; 
	}
	
	consoleString(){
		var res =
			"// " + this.name +"\n"
			+ "Algebra({";
		if(this.dimensions.length>2)
			res+= this.dimensions + ",";
		else if (this.metric!="")
			res+= "metric:[" + this.metric + "],";
		if(this.basis!="")
			res+= "basis: [" + this.basis + "],";
		
		res=res.substr(0, res.length-1);
		res+= "}, ()=>{\n";
		
		if(this.vectorsDef!=""){
			res+=
				"	// Definition of new vectors\n"
				+ "	" + this.vectorsDef + ";\n";
		}
		if(this.pointDef!=""){
			res+=
				"	// Function : return the point from a 3D Euclidean point\n"
				+"	var point = (x,y,z)=> " + this.pointDef + ";\n";
		}
		
		res+= "\n	//Write your code here !\n\n\n\n";
		res+= "  document.body.appendChild(this.graph([\n\n	],{grid:true}));";
		res+= "\n});";
		return res;
	}

	// retrieve the GA info from currentCode
	// return Algebra.describe() (object)
	static retrieveGAInfo(currentCode){
		if(currentCode.length!=0){
			/* delete comments */
			var args=currentCode.replace(/\/\*[\s\S]*?\*\//g, " ");
			// delete comments //
			args=args.replace(/\/\/.*/g, " ");
			// search Algebra
			var index = args.indexOf("Algebra");
			//substring since Algebra
			args = args.substring(index+8);
			// slice between ( and (
			var argsArray = args.split("(", 1);
			// slice between ( and )
			argsArray = argsArray[0].split(")", 1);
			// if ends with , delete it
			if(argsArray[0].endsWith(","))
				args=argsArray[0].substring(0, argsArray[0].length-1);
			else args=argsArray[0];
			// retrieve the description object
			var description = new Function('return Algebra(' + args + ').describe();');
			return description();
		}
	}
	
	// take an array, and construct a <tr> element with it
	// return the <tr> element
}
class ExistingGA{
	constructor(){
		this.GAArray = [];
		this.GAArray.push(new GA("pga2d","p:2, q:0, r:1"));
		this.GAArray.push(new GA("pga3d","p:3, q:0, r:1"));
		this.GAArray.push(new GA("cga2d","p:3, q:1"));
		this.GAArray.push(new GA("cga3d","p:4, q:1"));
		this.GAArray.push(new GA("mga3d","p:4, q:4"));
		this.GAArray.push(new GA("ccga3d","p:6, q:3"));
		this.GAArray.push(new GA("qcga3d","p:9, q:6"));
	}
}