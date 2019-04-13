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
		if(this._currentScript!=null){
			var parent = this._currentScript.parentNode
		}else{ 
			var parent = els.exampleView.contentWindow.document.body
		}
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
	constructor(language){
		this._currentScript = null;
		if(language==='js'){
		}
		else if(language==='gaViewer'){
			document.getElementById('viewer').removeChild(document.getElementById('exampleView'));
			document.getElementById('viewer').innerHTML += '<div id="viewerGAViewer" class="transi"></div>';
			
			this.Graph = document.getElementById("viewerGAViewer").appendChild(A.graph([],{gl:true,grid:true,conformal:true,z:8}));
			Object.assign(this.Graph.style,{width:'100%',height:'100%',position:'absolute'});
		}
	}
}
