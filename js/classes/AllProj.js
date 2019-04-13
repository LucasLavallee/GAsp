class AllProj{
	loadProjInfos(){
		els.projName.innerHTML = this._name;
		els.projAuthor.innerHTML = this._author;		
	}
	updateGA(currentCode){
		this._algebra.updateGAInfo(currentCode);
	}

	set setName(name){
		this._name = name;
	}
	setLanguage(lang){
		if(lang==="js" || lang==="gaViewer")
			this._language = lang;
	}

	get author(){return this._author;}
	get name(){return this._name;}
	get algebra(){return this._algebra;}
	get language(){return this._language;}

	constructor(name,author){
		this._name = name;
		this._author = author;
		this._algebra = new AlgebraController("");
		this._language = "js";
	}
}