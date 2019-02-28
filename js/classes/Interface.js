class Interface{


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

	constructor(){
		this.listExample = [];
		this.viewer = new Viewer();
		this.editor = new Editor();
		this.editor = this.editor.inst;
		this.editor.setValue("");
	}
}