class AllProj{
	loadProjInfos(currentCode){
		els.projName.innerHTML = this._name;
		els.projAuthor.innerHTML = this._author;
		this._algebra.updateGAInfo(currentCode);
	}

	set setName(name){
		this._name = name;
	}

	get author(){return this._author;}
	get name(){return this._name;}
	get algebra(){return this._algebra;}

	constructor(name,author){
		this._name = name;
		this._author = author;
		this._algebra = new AlgebraController("");
	}
}