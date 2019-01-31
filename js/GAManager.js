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
		if(typeof(this.dimensions)!="number")
			res+= this.dimensions + ",";
		else if (typeof(this.metric)!="undefined")
			res+= "metric:[" + this.metric + "],";
		if(typeof(this.basis)!="undefined")
			res+= "basis: [" + this.basis + "],";
		
		res+=res.sub(0, res.length-1);
		res+= "}, ()=>{\n";
		
		if(typeof(this.vectorsDef)!="undefined"){
			res+=
				"	// Definition of new vectors\n"
				+ "	" + this.vectorsDef + ";\n";
		}
		if(typeof(this.pointDef)!="undefined"){
			res+=
				"	// Function : return the point from a 3D Euclidean point\n"
				+"	var point = (x,y,z)=> return " + this.pointDef + ";\n"
				+ "	// To create a point, do point(x,y,z)\n"
		}
		
		res+= "\n	//Write your code here !\n\n\n\n";
		
		return res;
	}
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