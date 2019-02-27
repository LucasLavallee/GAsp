class AllProj{
	loadProjInfos(){
		els.projName.innerHTML = this._name;
		els.projAuthor.innerHTML = this._author;
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