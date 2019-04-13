


class AlgebraController{
	updateGAInfo(currentCode){
		els.macrosContent.innerHTML='';
		var description = this.retrieveGAInfo(currentCode);
		
		var metricTitle = document.createElement("p");
		// if there is a GA description
		if (description!=null){
			metricTitle.innerHTML = "Basis and Metric";
			els.macrosContent.appendChild(metricTitle);
			
			var metricTable = document.createElement("table");
			metricTable.appendChild(constructLine(description.basis));
			metricTable.appendChild(constructLine(description.metric));
			
			els.macrosContent.appendChild(metricTable);
		}
		// if there isn't a GA description
		else{
			metricTitle.innerHTML = "No Geometric Algebra in the console.";
			els.macrosContent.appendChild(metricTitle);
		}
	}

	retrieveGAInfo(currentCode){
		if(currentCode.length!=0 && this.algebra===undefined){
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
			args = JSON.parse("[" + args + "]");
			if(args.length < 3) args[2] = 0;
			this.setAlgebra(args[0],args[1],args[2]);
			// retrieve the description object
			
		}
		var description = this.algebra.describe();
		AppControllerInstance.interface.addContentLogs('<div class="logsInfo"><p>--- You change of Algebra ---</p></div><br><span>>></span>')

		return description;
	}

	buildAlgebraCode(name, dimensions, basis, metric, vectorsDef, pointDef){
		console.log("In buildAlgebraCode")
		if(dimensions.length < 3) dimensions[2] = 0;
		this.setAlgebra(dimensions[0],dimensions[1],dimensions[2]);
		let res =
			`//${name}\nAlgebra({p:${dimensions[0]},q:${dimensions[1]},r:${dimensions[2]},`;
		
		if(metric!=null){
			res += `metric:[${metric}],`;
		}
		if(basis!=null){
			res += `basis:[${basis}]`;
		}
		res+=`}, ()=>{\n`;
		if(vectorsDef!=null){
			res+=`\t// Definition of new vectors\n${vectorsDef};\n`;
		}
		if(pointDef!=null){
			res+=`\t// Function : return the point from a 3D Euclidean point\n\tvar point = (x,y,z)=>${pointDef};\n`
		}
		res+=`\n\t//Write your code here !\n\n\n\n\tdocument.body.appendChild(this.graph(()=>{\n\t},{grid:true}));\n});`;
		return res;
	}

	constructor(name){
		this.name = name;
	}
	setAlgebra(p,q,r){
		this.algebra = new Algebra(p,q,r);
	}

		//Setting the localStorage for a new algebra
	static setLocalStorage(name, dimensions, basis, metric, vectorsDef, pointDef){
			if(!Array.isArray(dimensions)){
				dimensions = dimensions.split(',');
			}
			if(basis != null && !Array.isArray(basis)){
				basis = basis.split(',');
			}
			if(metric != null && !Array.isArray(metric)){
				metric = metric.split(',');
			}
			window.localStorage.setItem("newGA",JSON.stringify({
				name: name,
				dim: dimensions,
				basis: basis,
				metric: metric,
				vector: vectorsDef,
				point: pointDef
			}))
	}

	/*static consoleString(name, dimensions, basis, metric, vectorsDef, pointDef) {
		let res =
			"// " + name +"\n"
			+ "Algebra({";
		if(dimensions.length>2)
			res+= dimensions + ",";
		else if (metric!="")
			res+= "metric:[" + metric + "],";
		if(basis!="")
			res+= "basis: [" + basis + "],";
		
		res=res.substr(0, res.length-1);
		res+= "}, ()=>{\n";
		
		if(vectorsDef!=""){
			res+=
				"	// Definition of new vectors\n"
				+ "	" + vectorsDef + ";\n";
		}
		if(pointDef!=""){
			res+=
				"	// Function : return the point from a 3D Euclidean point\n"
				+"	var point = (x,y,z)=> " + pointDef + ";\n";
		}
		
		res+= "\n	//Write your code here !\n\n\n\n";
		res+= "  document.body.appendChild(this.graph([\n\n	],{grid:true}));";
		res+= "\n});";
		return res;
	}*/
}

AlgebraController.existingGAs = [
	{
		name : 'pga2d',
		//dimensions : 'p:2, q:0, r:1'
		dimensions :  [2,0,1],
		language: ['js']
	},
	{
		name : 'pga3d',
		//dimensions : 'p:3, q:0, r:1'
		dimensions :  [3,0,1],
		language: ['js']
	},
	{
		name : 'cga2d',
		//dimensions : 'p:3, q:1'
		dimensions :  [3,1],
		language: ['js']
	},
	{
		name : 'cga3d',
		//dimensions : 'p:4, q:1'
		dimensions :  [4,1],
		language: ['js','gaViewer']
	},
	{
		name : 'mga3d',
		//dimensions : 'p:4, q:4'
		dimensions :  [4,4],
		language: ['js']
	},
	{
		name : 'ccga3d',
		//dimensions : 'p:6, q:3'
		dimensions :  [6,3],
		language: ['js']
	},
	{
		name : 'qcga3d',
		//dimensions : 'p:9, q:6'
		dimensions :  [9,6],
		language: ['js']
	}
]