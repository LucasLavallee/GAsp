class Editor{

	init(language){
		if (window.ace) {
			switch(language){
				case 'gaViewer':
					const consoleSub = document.createElement("div");
					consoleSub.setAttribute("id","consoleSub");
					consoleSub.innerHTML = `<p>GAViewer syntax test.</p>
				<p>* mode : CGA (ala init(2))</p>
				<p>* basis vectors : e1, e2, e3, e4, e5, ni, no, I3, I5</p>
				<p>* supports colors, dynamic, pt</p>
				<p>* more coming ...</p>
				<p>* eg : </p>
				    <p>a = pt( e1 )</p>
				    <p>b = pt( e2 )</p>
				    <p>dynamic { c = a ^ b ^ ni; } // ; prevents render</p>
				    <p>cyan(c)</p>
				    <p>red(a ^ b ^ no)</p>`;
					const inputConsole = document.createElement("div");
					inputConsole.setAttribute("id","inputConsole");

					var editor = ace.edit(inputConsole);
					editor.setOptions({
				        maxLines: 1, // make it 1 line
				        autoScrollEditorIntoView: true,
				        highlightActiveLine: false,
				        printMargin: false,
				        showGutter: false,
				        mode: "ace/mode/javascript",
				        theme: "ace/theme/tomorrow_night_eighties"
				    });
				    // remove newlines in pasted text
				    editor.on("paste", function(e) {
				        e.text = e.text.replace(/[\r\n]+/g, " ");
				    });
				    // make mouse position clipping nicer
				    editor.renderer.screenToTextCoordinates = function(x, y) {
				        var pos = this.pixelToScreenCoordinates(x, y);
				        return this.session.screenToDocumentPosition(
				            Math.min(this.session.getScreenLength() - 1, Math.max(pos.row, 0)),
				            Math.max(pos.column, 0)
				        );
				    };
				    // disable Enter Shift-Enter keys
				    editor.$blockScrolling = Infinity;
				    editor.commands.bindKey("Enter|Shift-Enter", function(){ 
				      try {
				        editor.setValue(addCmd(editor.getValue()));
				        editor.clearSelection();
				      } catch(e){ 
				        consoleSub.innerHTML+="<p><FONT COLOR=#800>"+e.message+"</FONT></p>";
				        consoleSub.scrollTop+=1000;
				      }
				    });  
				    editor.commands.bindKey("Up",function () {
				      if (histp==-1) histp = cmds.length;
				      editor.setValue(cmds[Math.max(0,--histp)]);
				    })
				    editor.commands.bindKey("down",function () {
				      if (histp==-1) histp = cmds.length;
				      editor.setValue(cmds[Math.min(cmds.length,++histp)]||"");
				    })
				    editor.focus();
				    const cons = document.getElementById("console");
				    cons.innerHTML = "";
				    cons.appendChild(consoleSub);
				    cons.appendChild(inputConsole);
			     	return editor;

				default:
					var editor = ace.edit("console");
				    editor.setAutoScrollEditorIntoView(true);
				    editor.setTheme(this.theme); //theme setters 
				    editor.session.setMode(this.mode); //mode = js, php etc...
			     	editor.resize();
			     	return editor;
			}
		    
	    } else { // can't load ace editor
	      	console.log("Can't load Ace editor");
	    }
	}

	constructor(language){ //js or gaViewer
		this.theme = "ace/theme/tomorrow";
		this.mode = "ace/mode/javascript";
		this.inst = this.init(language);
	}


	/*init(){
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
	}*/
}

/*
init(language){
		if (window.ace) {
			switch(language){
				case 'gaViewer':
					const consoleSub = document.createElement("div");
					console.id = "consoleSub";
					const inputConsole = document.createElement("div");

					var editor = ace.edit(inputConsole);
					editor.setOptions({
				        maxLines: 1, // make it 1 line
				        autoScrollEditorIntoView: true,
				        highlightActiveLine: false,
				        printMargin: false,
				        showGutter: false,
				        mode: "ace/mode/javascript",
				        theme: "ace/theme/tomorrow_night_eighties"
				    });
				    // remove newlines in pasted text
				    editor.on("paste", function(e) {
				        e.text = e.text.replace(/[\r\n]+/g, " ");
				    });
				    // make mouse position clipping nicer
				    editor.renderer.screenToTextCoordinates = function(x, y) {
				        var pos = this.pixelToScreenCoordinates(x, y);
				        return this.session.screenToDocumentPosition(
				            Math.min(this.session.getScreenLength() - 1, Math.max(pos.row, 0)),
				            Math.max(pos.column, 0)
				        );
				    };
				    // disable Enter Shift-Enter keys
				    editor.$blockScrolling = Infinity;
				    editor.commands.bindKey("Enter|Shift-Enter", function(){ 
				      try {
				        editor.setValue(addCmd(editor.getValue()));
				        editor.clearSelection();
				      } catch(e){ 
				        out.innerHTML+="<FONT COLOR=#800>"+e.message+"</FONT>\n";
				        out.scrollTop+=1000;
				      }
				    });  
				    editor.commands.bindKey("Up",function () {
				      if (histp==-1) histp = cmds.length;
				      editor.setValue(cmds[Math.max(0,--histp)]);
				    })
				    editor.commands.bindKey("down",function () {
				      if (histp==-1) histp = cmds.length;
				      editor.setValue(cmds[Math.min(cmds.length,++histp)]||"");
				    })
				    editor.focus();
				    const cons = document.getElementById("console");
				    cons.appendChild(consoleSub);
				    cons.appendChild(inputConsole);
			     	return editor;

				default:
					var editor = ace.edit("console");
				    editor.setAutoScrollEditorIntoView(true);
				    editor.setTheme(this.theme); //theme setters 
				    editor.session.setMode(this.mode); //mode = js, php etc...
			     	editor.resize();
			     	return editor;
			}
		    
	    } else { // can't load ace editor
	      	console.log("Can't load Ace editor");
	    }
	}

	constructor(language){ //js or gaViewer
		this.theme = "ace/theme/tomorrow";
		this.mode = "ace/mode/javascript";
		this.inst = this.init(language);
	}

*/