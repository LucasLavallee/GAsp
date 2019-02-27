class Editor{
	init(){
		if (window.ace) {
		    var editor = ace.edit("console");
		    editor.setAutoScrollEditorIntoView(true);
		    editor.setTheme(this.theme); //theme setters 
		    editor.session.setMode(this.mode); //mode = js, php etc...
	     	editor.resize();
	     	return editor;
	    } else { // can't load ace editor
	      	console.log("Can't load Ace editor");
	    }
	}

	constructor(){
		this.theme = "ace/theme/tomorrow";
		this.mode = "ace/mode/javascript";
		this.inst = this.init();
	}
}