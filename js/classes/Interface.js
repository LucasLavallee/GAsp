class Interface{


/*
	pt1 = 2e1;

pt2 = -2e1;

pt3 = 1.5*e1 + 1e2;

plan1 = !(!(pt1-pt2));

plan2 = !(pt1-pt3),

line  = !(plan1 ^ !(plan2)),

*/
	/*
		resolve the last instuction in logs console
	*/
	resolveLogs(){
		var ctnt = document.getElementById('logs');
		const value = ctnt.textContent;
		let instr = value.slice(value.lastIndexOf('>>')+2, value.length);
		instr = instr.replace(/\s/g, ""); //remove spaces
		const allInToShow = instr.match(/[A-Za-z0-9_]*=.*?[,;]/g); //Get all the affectation/instruction put in the log console

		if(allInToShow!=null){
			let parseInstr = allInToShow.reduce((acc, instr)=> {
				if(instr != ""){
					const lastChar = instr.substring(instr.length-1,instr.length);
					const newVal  = instr.replace(lastChar,'');
					const infos = newVal.split('=');
					if(infos.length===2)
						return [...acc,{name:infos[0], value: infos[1].replace(/e(\d+)/g,"1e$1").replace(/([-]?\d+([.]\d+)?)1e(\d+)/g,"($1$2)*1e$3"), type: lastChar}];
				}
				return acc;
			}, []);
			const keys = parseInstr.reduce((acc,n) => [...acc, n.name],[]);
			parseInstr.map(n => {
				let test = false;
				keys.map(k => {
					let res = parseInstr.find(x => x.name === n.name);
					if(res.value.includes(k)){
						res.value = res.value.replace(k,'('+parseInstr.find(x => x.name === k).value+')');
					}
				});
			});

			const dispValue = parseInstr.filter(v => v.type === ',');
			if(dispValue.length==0){
				this.addContentLogs('<div class="resLogs"><p><strong><em>No \' , \' found to display values</em></strong></p></div>');
			}
			dispValue.map(instr => {
				try {
					let total = "";
					if(keys.length!=0)
			    		total = instr.name + " = "+ AppControllerInstance.algebra.algebra.inline(new Function("return "+instr.value))().toString().replace(/_(\d+)/g,"<sub>$1</sub>");
			      	else
			      		total = AppControllerInstance.algebra.algebra.inline(new Function("return "+instr))().toString().replace(/_(\d+)/g,"<sub>$1</sub>");
			      	this.addContentLogs('<div class="resLogs"><p><strong><em>'+total+'</em></strong></p></div>');
			    } catch (e) {
			     	this.addContentLogs('<div class="resLogs"><p><strong><em>'+e.message+'</em></strong></p></div>');
			    }
			})
		}
		else{
			try {
				let total = "";
		      	total = AppControllerInstance.algebra.algebra.inline(new Function("return "+instr))().toString().replace(/_(\d+)/g,"<sub>$1</sub>");
		      	this.addContentLogs('<div class="resLogs"><p><strong><em>'+total+'</em></strong></p></div>');
		    } catch (e) {
		     	this.addContentLogs('<div class="resLogs"><p><strong><em>'+e.message+'</em></strong></p></div>');
		    }
		}

		this.addContentLogs('<span>>></span>');

		document.getSelection().collapse(ctnt.lastChild,1);
	}

	addContentLogs(content){
		var ctnt = document.getElementById('logs');
		ctnt.innerHTML += content;
	}
	/*
		Load an example in the interface
	*/
	static loadExample(name){
		let ex = exampleList.find(ex => ex.includes(name));
		let cutIdx = ex.indexOf("_");
		ex = new Example(ex.slice(cutIdx+1,ex.length),ex.slice(0,cutIdx))
		ex.loadProjInfos();
    	els.exampleView.setAttribute("src", "./js/lib/ganja.js/examples/example_"+name+".html");
	}



	/*
		Display all example in the "Choose an example" panel
	*/
	displayExample(){
		const isIn = (arr, value) => arr.includes(value);
		let categories = this.listExample.map(x=>x.category);
		const cats = categories.reduce((acc,n)=> {
			if(!isIn(acc,n)) 
				acc = [...acc,n];
			return acc;
		},[]);
		for(let cat of cats){
			let exampleCat = document.createElement("div");
				exampleCat.classList.add("exampleCat");
				const titleCat = document.createElement("p");
				titleCat.innerHTML = cat;
				titleCat.setAttribute("class", "exTitles");
				els.allEx.appendChild(titleCat);

				const listEx = this.listExample.filter(e=>e.category == cat); //filter the example that have the current categorie
				for(let ex of listEx){
					const fullName= ex.fullName;
					const example = document.createElement("div");
					const imageEx = document.createElement("img");
					imageEx.setAttribute("title", fullName);
					imageEx.setAttribute("src", "./js/lib/ganja.js/images/"+fullName+".jpg");
					imageEx.setAttribute("onclick", "Interface.loadExample('"+fullName+"')");
					example.appendChild(imageEx);
					const titleEx = document.createElement("p");
					titleEx.innerHTML=fullName;
					example.appendChild(titleEx);
					exampleCat.appendChild(example);
				}
				els.allEx.appendChild(exampleCat);
		}
	}


	/*
		Put all the known examples in this.listExample
	*/
	loadExamples(){
        for(let example of exampleList){
            let cutIdx = example.indexOf("_");
            this.listExample = [...this.listExample, new Example(example.slice(cutIdx+1,example.length),example.slice(0,cutIdx))];
        }
    }

    /*
		Update the viewer panel with the current code of the editor
    */
	updateViewer(){
		var currentCode = this.editor.getValue();
		this.viewer.update(currentCode);
	}

	/*
		Update the editor content with the code given in parameters
    */
	updateEditor(code){
		this.editor.setValue(code);
	}


	/* 
		Initialize the interface depending on the currentMode (example or project)
	*/
	init(currentMode){
		switch(currentMode){
			case 0:
				els.run.style.top = '-10px';
				break;
			case 1: 
				this.loadExamples();
				els.clear.style.display = 'none';
				els.headerExample.style.display = 'flex';
				els.allEx.style.display = 'block';
				Interface.loadExample("pga3d_icosahedron");
				break;
		}
	}

	initLanguage(lang){
		/*switch(lang){
			case 'gaViewer':
				break;
			default:
				this.viewer = new Viewer();
				this.editor = new Editor(lang);
		}*/
				this.viewer = new Viewer(lang);
				this.editor = new Editor(lang);

		this.editor = this.editor.inst;
		this.editor.setValue("");
	}

	constructor(language){
		this.listExample = [];
		this.initLanguage(language);
	}
}