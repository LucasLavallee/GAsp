class Example extends AllProj{
	constructor(name, category){
		super(name, "ganja js master");
		this._category = category;
	}

	get fullName(){
		return this._category+"_"+this._name;
	}
}