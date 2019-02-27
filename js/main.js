const exampleList = ["complex_mandelbrot","complex_least_squares",
            "dual_differentiation","dual_backpropagation",
            "quaternion_hue","quaternion_mandelbrot",
            "timespace_lorentz",
            "pga2d_points_and_lines","pga2d_distances_and_angles","pga2d_project_and_reject","pga2d_rotors_and_translators","pga2d_isometries", "pga2d_inverse_kinematics","pga2d_separating_axis","pga2d_pose_estimation","pga2d_euler_line","pga2d_desargues_theorem","pga2d_differentiation","pga2d_physics_moon","pga2d_origami", "pga2d_poncelet",
            "pga3d_points_and_lines","pga3d_distances_and_angles","pga3d_rotors_and_translators","pga3d_icosahedron","pga3d_sampling","pga3d_slicing","pga3d_differentiation","pga3d_skinning","pga3d_physics_planets","pga3d_origami","pga3d_physics_symmetric_top","pga3d_physics_free_top","pga3d_objects","pga3d_levenberg_marquardt",
            "cga2d_points_and_circles","cga2d_project_and_reject","cga2d_rotors_and_translators","cga2d_euler_line",
            "cga3d_points_circles_lines","cga3d_points_spheres_planes","cga3d_dual_spheres_planes","cga3d_intersections","cga3d_project_reject","cga3d_opns_visualizer","cga3d_opns_line_circle","cga3d_json",
            "mga3d_points_and_lines",
            "ccga3d_points_quadrics",
            "qcga3d_points_and_more",
            "game_wedge"];
changeActive = (element) =>{
	element.classList.toggle("active");
}

// Elements.
const els={};
["#viewer","#viewerPanel","#run","#ganjaCode","#consoleMode","#objectMode","#console","#movableLeft","#movableUp","#leftPanel","#macros","#nav","#headerMacro","#presentationMode","#exampleView","#macrosContent","#headerExample","#allEx","#examples","#projName","#projAuthor","#clear","#sign_up_send","#errorForm","#sign_in_send","#pop_up_black","#saveButton","#name_project","#save","#menuAccount","#connectedButton","#logout","#shareIcon","#sharePanel","#newProject_send","#submitCoword","#inpNewCowork"].forEach(x=>els[x.replace(/[.#]/g,'')]=document.querySelector(x));

const elsClass={};
[".selectMode",".optionSetting",".cross"].forEach(x=>elsClass[x.replace(/[.]/g,'')]=document.querySelectorAll(x));

/* Main Singleton initialisation */
AppControllerInstance.init();
const viewer = AppControllerInstance.interface.viewer;
const editor = AppControllerInstance.interface.editor;
const account = AppControllerInstance.account;


var transitionTime = 800;
/********************
    	Event Listener
   	********************/
 		//Scalable sections
		els.movableLeft.onmousedown=(e) =>{
			window.onmousemove = function(e) {
				els.presentationMode.classList.remove("active");
				//Remove the smoothing transition
				if(els.leftPanel.classList.contains("transi")){
					els.leftPanel.classList.remove("transi");
					els.viewerPanel.classList.remove("transi");
				}
				var width = document.body.clientWidth ;
				var mouseX = e.clientX;
			
					 //In case of double screen
				if(mouseX<0) mouseX = 0;
				else if(mouseX>width-4) mouseX = width-4;	 
				var pourc = ((mouseX)*100)/width;
				els.leftPanel.style.width = pourc+"%";
				els.viewerPanel.style.width = (100-pourc)+"%";
				els.viewerPanel.style.marginLeft = pourc+"%";
				editor.resize();
				viewer.resize();
			}
			window.onmouseleave = window.onmouseup = function(e) { window.onmouseleave = window.onmouseup = window.onmousemove = undefined; };
		}
		els.movableUp.onmousedown=(e) =>{
			window.onmousemove = function(e) {
				AppControllerInstance.macroDeploy = true;
				//Remove the smoothing transition
				if(els.consoleMode.classList.contains("transi")){
					els.consoleMode.classList.remove("transi");
					els.macros.classList.remove("transi");
				}
				var height = els.leftPanel.offsetHeight;
				var mouseY = e.clientY;
				if(mouseY-els.nav.offsetHeight > els.leftPanel.offsetHeight-50 ){
					mouseY = els.leftPanel.offsetHeight+20; //Definitly not a magic number, will come back to it later
					AppControllerInstance.macroDeploy = false;
				}
				if(mouseY-els.nav.offsetHeight < 50)
					mouseY = 50;
				
				var pourc = ((mouseY-els.nav.offsetHeight)*100)/height;

				els.consoleMode.style.height = pourc+"%";
				els.macros.style.height = (100-pourc)+"%";
				editor.resize();
			}
			window.onmouseleave = window.onmouseup = function(e) { window.onmouseleave = window.onmouseup = window.onmousemove = undefined; };
		}
		els.headerMacro.onclick = (e) => {
			if(!AppControllerInstance.macroDeploy){
				els.consoleMode.classList.add("transi");
				els.macros.classList.add("transi");
				els.consoleMode.style.height = "60%";
				els.macros.style.height = "40%";
				AppControllerInstance.macroDeploy = true;
			}
			else{
				els.consoleMode.classList.add("transi");
				els.macros.classList.add("transi");
				els.consoleMode.style.height = "calc(100% - 50px)";
				els.macros.style.height = "50px";
				AppControllerInstance.macroDeploy = false;
			}
		}
		//Presentation Mode
		els.presentationMode.onclick = (e) =>{
			changeActive(els.presentationMode);
			if(els.presentationMode.classList.contains("active")){
				els.leftPanel.classList.add("transi");
				els.viewerPanel.classList.add("transi");
				els.leftPanel.style.width = els.viewerPanel.style.marginLeft = "0%";
				els.viewerPanel.style.width = "100%";
			}
			else{
				els.leftPanel.classList.add("transi");
				els.viewerPanel.classList.add("transi");
				els.leftPanel.style.width = els.viewerPanel.style.marginLeft = "40%";
				els.viewerPanel.style.width = "60%";
			}
		}
		els.headerExample.onclick = (e) =>{
			changeActive(els.examples);
			changeActive(els.exampleView);
			if(els.allEx.innerHTML == '')
			AppControllerInstance.interface.displayExample();
			setTimeout(function(){viewer.resize(); }, transitionTime);
		}
		for(var i = 0; i<elsClass.optionSetting.length; i++){
			elsClass.optionSetting[i].onclick = (function (i){
				return function (){
					changeActive(elsClass.optionSetting[i]);
					//Changing currentInfos param
					var data = elsClass.optionSetting[i].dataset.val;
					if(elsClass.optionSetting[i].classList.contains("active")){
						currentInfos["options"][data] === "false" ? currentInfos["options"][data] = "true" : currentInfos["options"][data] = true;
					}
					else{
						currentInfos["options"][data] === "true" ? currentInfos["options"][data] = "false" : currentInfos["options"][data] = false;
					}
					//changing the options of the current instance
					inst.setOption(data, currentInfos["options"][data]);
					refreshConsole();
					updateViewer();
				}
			})(i);
		}

		els.sign_up_send.onclick = (e) =>{
			account.signUp();
		}
		els.sign_in_send.onclick = (e) =>{
			account.signIn(false);
		}

		//Iframe loading
		els.exampleView.onload = (e)=>{
			AppControllerInstance.preloadIframe();
	      	//Taking the script of the example
	      	viewer.currentScript = [...els.exampleView.contentDocument.querySelectorAll("script")].pop();
	      	editor.setValue(viewer._currentScript.innerText);
			AppControllerInstance.mainProject.algebra.updateGAInfo(editor.getValue());
	    }

	    //Manage the save if user is logged in or not
	    els.saveButton.onclick = () =>{
	    	if(account.state){
	    		if(project.link != "")
	    			project.updateProject(editor.getValue());
	    		else{
	    			els.pop_up_black.classList.add("active");
	    			els.name_project.classList.add("active");
	    		}
	    	}
	    	else{
	    		els.pop_up_black.classList.add("active");
	    		els.save.classList.add("active");
	    	}
	    }

	    els.menuAccount.onclick = () =>{
	    	if(account.state){
	    		changeActive(els.connectedButton);
	    	}
	    }
	    els.logout.onclick = () =>{
	    	account.logout();
	    }
	    els.shareIcon.onclick = () =>{
	    	changeActive(els.sharePanel);
	    	project.updateShareInfos();
	    }
	    els.newProject_send.onclick = () =>{
	    	project.saveProject(document.getElementById("nameProjectUp").value, editor.getValue());
	    }
	    els.submitCoword.onclick = () =>{
	    	project.addCoworkers(els.inpNewCowork.value, project.id);
	    }
	    elsClass.cross[0].onclick = () =>{
	    	changeActive(els.pop_up_black);
	    	changeActive(els.save);
	    }
	    elsClass.cross[1].onclick = () =>{
	    	changeActive(els.pop_up_black);
	    	changeActive(els.name_project);
	    }



		//EVENTS LISTENER ON CONSOLE 
	    AppControllerInstance.interface.editor.session.on('change', function(delta) {
			// delta.start, delta.end, delta.lines, delta.action
			if(delta.action=="insert" || delta.action=="remove"){
				els.run.classList.add("active");
			}
		});

		//EVENT CLICK RUN 
		document.getElementById("run").onclick=() =>{
			const valueEd = editor.getValue();
			viewer.update(valueEd);
			AppControllerInstance.mainProject.algebra.updateGAInfo(valueEd);
		}
		
		//EVENT CLICK CLEAR
		els.clear.onclick=() =>{
			const valueEd = editor.getValue();
			editor.setValue("");
			viewer.update(valueEd);
			AppControllerInstance.mainProject.algebra.updateGAInfo(valueEd);
		}
