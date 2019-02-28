class Viewer{
	resize(){
		//CANVAS SIZE
	    var present = els.exampleView.contentDocument.querySelector("svg")||els.exampleView.contentDocument.querySelector("canvas");
	   	if(present == null)
	   		return;
	    if (present || present.value){ 
            /*console.log("YAS1")
	    	present.width= els.exampleView.offsetWidth; 
            console.log("YAS2")
	    	present.height = els.exampleView.offsetHeight;*/
	    	present.style.width= "100%";
	    	present.style.height = "100%";	
	    }
	}

	update(newValue){
		this._currentScript!=null ? var parent = this._currentScript.parentNode : var parent = els.exampleView.contentWindow.document.body;
		parent.innerHTML = '';
		var script= document.createElement('script');
 		script.innerHTML = newValue;
 		parent.appendChild(script);
 		this._currentScript = script;
		this.resize();
		changeActive(els.run);
	}

	set currentScript(val){
		this._currentScript = val;
	}
	get getCurrentS(){ return this._currentScript;}
	constructor(){
		this._currentScript = null;
	}
}
