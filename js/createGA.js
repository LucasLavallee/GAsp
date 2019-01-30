class GA{
	constructor(name, dimensions, basis, metric, vectorsDef, pointDef){
		this.name = name;
		this.dimensions = dimensions; // integer
		this.basis = basis; // '1','e12','e13','e23'
		this.metric = metric; //ex : 1,1,1,-1
		this.vectorsDef = vectorsDef; 
		this.pointDef = pointDef; 
	}
	
	consoleString(){
	// it exists default basis names which come with some specific dimensions
	var res =
		"// " + this.name
		+ "Algebra(metric:[" + this.metric + "], basis: [" + this.basis + "], ()=>{\n"
		+ "//define new vectors\n"
		+ this.vectorsDef + ";\n"
		+ "	var point = (x,y,z)=>" + this.pointDef + ";\n"
		+ "	//To create a point, do point(x,y,z)\n"
		+ "\n	//Write your code here !"
		+ "});"
	;
	return res;
	}
}
