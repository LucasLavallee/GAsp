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
["#viewer","#viewerPanel","#run","#ganjaCode","#consoleMode","#objectMode","#console","#movableLeft","#movableUp","#leftPanel","#macros","#nav","#headerMacro","#presentationMode","#exampleView","#macrosContent","#headerExample","#allEx","#examples","#projName","#projAuthor","#clear","#sign_up_send","#errorForm","#sign_in_send","#pop_up_black","#saveButton","#name_project",
"#save","#menuAccount","#connectedButton","#logout","#shareIcon","#sharePanel","#newProject_send","#submitCoword","#inpNewCowork","#modalYes","#triggerConsole","#logs","#logsContainer","#infosLogs"].forEach(x=>els[x.replace(/[.#]/g,'')]=document.querySelector(x));

const elsClass={};
[".selectMode",".optionSetting",".cross",".coworkers"].forEach(x=>elsClass[x.replace(/[.]/g,'')]=document.querySelectorAll(x));

/* Main Singleton initialisation */
AppControllerInstance.init();

const viewer = AppControllerInstance.interface.viewer;
const editor = AppControllerInstance.interface.editor;
const account = AppControllerInstance.account;
const project = AppControllerInstance.mainProject;


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
			//setTimeout(function(){viewer.resize(); }, transitionTime);
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

		for(var i = 0; i<elsClass.coworkers.length; i++){
			console.log("ONCLICK DETECTED ON ID ");
			elsClass.coworkers[i].onclick = (function (i){
				return function (){

			console.log(i);
					AppControllerInstance.modal.setAll("Are you sure ?","Do you really want to remove this coworker ? This process can't be undone.",0,Project.removeCoworkers,[elsClass.coworkers[i].dataset.user,elsClass.coworkers[i].dataset.idProj]);
					AppControllerInstance.modal.display();
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
		els.exampleView.onload = (e)=> {
			AppControllerInstance.preloadIframe();
	      	//Taking the script of the example
	      	viewer.currentScript = [...els.exampleView.contentDocument.querySelectorAll("script")].pop();
	      	editor.setValue(viewer._currentScript.innerText);
			project.algebra.updateGAInfo(editor.getValue());
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

	    /* 
			COWORKERS
	    */

	    els.submitCoword.onclick = () =>{
	    	project.addCoworkers(els.inpNewCowork.value, project.id);
	    }

	    els.inpNewCowork.onkeydown = () =>{
	    	project.lookingForCoworkers(els.inpNewCowork.value);
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
			//ICI
			viewer.update(valueEd);
			project.algebra.updateGAInfo(valueEd);
		}
		
		//EVENT CLICK CLEAR
		els.clear.onclick=() =>{
			const valueEd = editor.getValue();
			editor.setValue("");
			viewer.update(valueEd);
			project.algebra.updateGAInfo(valueEd);
		}

		//Consoles

		els.triggerConsole.onclick = () =>{
			changeActive(els.logsContainer);
			changeActive(els.console);
		}

		els.logs.onkeydown = (e) =>{
			if(e.keyCode === 13){
				AppControllerInstance.interface.resolveLogs();
				e.preventDefault();
			}
		}
		els.infosLogs.onclick = () => {
			AppControllerInstance.modal.setAll("Console information","<p>In this console, you can enter any type of expression (eg. 1e1*1e12).</p> <p>You can also enter a series of instructions (pt1 = 2e1; pt2 = pt1 + 1e2;).</p><p>To display a result of any instruction you need to end your instruction with a comma (',').</p><p><strong>Mathematical expression: </strong>'!' = dual, '^' = wedge</p>",0,Modal.remove(),null);
			AppControllerInstance.modal.display();
		}



    
  // Testing simple collect parser that displays each command ..
    var cmds = [], results = [], histp=-1;
    var toTex = (x)=>{ var r=x.match(/e?\d+|\bno\b|\bni\b/)?'$'+x.replace(/\&/g,"\\vee ")
                                                   .replace(/\^/g,"\\wedge ")
                                                   .replace(/\*\*(\w+)/g,"^{$1}")
                                                   .replace(/\*\*(\(.*?\))/g,"^{$1}")
                                                   .replace(/alpha/g,'\\alpha')
                                                   .replace(/beta/g,'\\beta')
                                                   .replace(/gamma/g,'\\gamma')
                                                   .replace(/\bno\b|^no$/g,"n_o")
                                                   .replace(/\bni\b|^ni$/g,"n_\\infty")
                                                   .replace(/e_/g,'e').replace(/e(\d+)/g,"e_{$1}")+'$':x; console.log(r); return r; }

		//GAViewer
var addCmd = (cmd)=>{ 
      // no assignment, no graphing .. just evaluate and print the output.
      const out = document.getElementById("consoleSub");
      histp=-1; var ocmd=cmd;
      try {
        var dynamic = cmd.match(/dynamic\s*\{/)
        if (dynamic) cmd = cmd.replace(/dynamic\s*\{/,"").replace(/\}\s*$/,"");
        var vname = cmd.match( /^\s*([A-Za-z_\-]+)\s*=(.*)/ );
        if (vname) {
          var result = A.inline(new Function("return "+(dynamic?" ()=>":"")+vname[2]))();
          window[vname[1]] = result;
        } else {
          var result = A.inline(new Function("return "+(dynamic?" ()=>":"")+cmd))();
        }
        if (result != undefined) { cmds.push(ocmd); if (result._color) results.push(result._color); results.push(result); }
      } catch (e) {
        out.innerHTML += '<FONT COLOR=#800>'+e.message+'</FONT>\n';
        out.scrollTop += 1000;
        return cmd;
      }
      if (result !== undefined) {
        while (result.call) result=result();
        out.innerHTML += '<p>['+cmds.length+'] '+(dynamic?"dynamic{"+toTex(cmd)+"}":toTex(cmd))+'</p><p>'+((vname&&vname[1])||"ans")+' = '+toTex(''+result)+'</p>';
        renderMathInElement(out,{delimiters:[{left: '$',right:'$',display:!1}]});
        out.scrollTop += 1000;
        if (!cmd.match(/;\s*$/)) {
          viewer.Graph.value.splice(0,viewer.Graph.value.length,...results);
          viewer.Graph.update(viewer.Graph.value);
        }
      }
      return "";
    }

    // PREAMBLE - GAVIEWER commands.
    var clc     = ()=>{ cmds = []; out.innerHTML=''; histp = -1; },
        clf     = ()=>{ viewer.Graph.update([]); results = []; },
        cld     = ()=>{},
        exp     = (x)=>A.Exp(x),
        inverse = (x)=>x.Inverse,
        grade   = (a,b)=>{ while(a.call)a=a.call(); return b!==undefined?a.Grade(b):a.Grade(4).VLength?4:a.Grade(3).VLength?3:a.Grade(2).VLength?2:a.Grade(1).VLength?1:0},
        dual    = (x)=>A.Dual(x),
        norm    = (x)=>A.Length(x),
        unit    = (x)=>A.Normalize(x),
        red     = (x)=>{ x._color = 0xFF0000; return x; },
        green   = (x)=>{ x._color = 0x00FF00; return x; },
        blue    = (x)=>{ x._color = 0x0000FF; return x; },
        yellow  = (x)=>{ x._color = 0xFFFF00; return x; },
        pink    = (x)=>{ x._color = 0xFF00FF; return x; },
        cyan    = (x)=>{ x._color = 0x00FFFF; return x; },
        white   = (x)=>{ x._color = 0xFFFFFF; return x; },
        black   = (x)=>{ x._color = 0xFFFFFF; return x; },
        pt      = A.inline(x=>no+x+.5*x.Length*ni);
  // 2D PGA      
//    const [e0,e1,e2,e12,e01,e02,e012] = A.inline(()=>[1e0,1e1,1e2,1e12,1e01,1e02,1e012])();         
  // 3D CGA      
    const [e1,e2,e3,e4,e5,e12,e13,e14,e15,e23,e24,e25,e34,e35,e45,no,ni,I3,I5,pi,e] = A.inline(()=>[1e1,1e2,1e3,1e4,1e5,1e12,1e13,1e14,1e15,1e23,1e24,1e25,1e34,1e35,1e45,()=>.5e5-.5e4,()=>1e4+1e5,1e123,1e12345,Math.PI,Math.E])();         