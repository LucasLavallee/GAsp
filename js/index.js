const els={};
		["#iconOpen", "#iconCreate", "#signIn", "#chooseGA","#validate","#projectList","#goBackStart","#formCreateGA","#check","#infoGA","#GAChoiceDiv"].forEach(x=>els[x.replace(/[.#]/g,'')]=document.querySelector(x));
		changeActive = (element) => {
            element.classList.toggle("active");
        }
        changeUnactive = (element) => {
            element.classList.toggle("unactive");
        }
        changeActiveThis = (element) => {
            element.classList.toggle("activeThis");
        }
		
		// construct the list of existing GA in the DOM
		const GAs = new ExistingGA();
		GAs.GAArray.map( GA => {
			const newNode = document.createElement("p");
			newNode.innerHTML = GA.name;
			els.GAChoiceDiv.appendChild(newNode);
		})
		

        var account = new Account();
        account.isLoggedIn();

				
		/*//// EVENT LISTENERS ////*/

		const circlesOnClick = () => {
			const elsClass = {};
			[".circleBase", ".type1"].forEach(x => elsClass[x.replace(/[.]/g, '')] = document.querySelectorAll(x));
            for (let i = 0; i < elsClass.circleBase.length; i++) {
                elsClass.circleBase[i].onclick = (function (i) {
                    return () => {
                        // indice i pour la div cliquée et (i+1)%3 et (i+2)%3 pour les deux classes restantes 
                        if (elsClass.circleBase[i].classList.contains("indexPage"))
                        {
                            changeActiveThis(elsClass.circleBase[i]);
                        }
                        else if (elsClass.circleBase[i].classList.contains("active")==false){
							changeActive(elsClass.circleBase[i]);
							document.getElementById("icons").classList.toggle("activeDiv");
							changeUnactive(elsClass.circleBase[(i + 1) % 3]);
							changeUnactive(elsClass.circleBase[(i + 2) % 3]);
                        }
                    }
                })(i);
            }
        }
        
		circlesOnClick();
		
		// manage the display of the signIn item
        els.iconOpen.addEventListener("click", () => {
            if(account.state){
                window.location.replace("./project.html");
            }
			else{
                if (els.iconOpen.classList.contains("unclickable")==false){
				    els.signIn.classList.toggle("activeClass");
				    els.iconOpen.classList.add("unclickable");
			    }
            }
        })

		// manage the display of the create-project item
        els.iconCreate.addEventListener("click", () => {
			if ( els.iconCreate.classList.contains("unclickable")==false){
				els.chooseGA.classList.toggle("activeClass2");
				els.iconCreate.classList.add("unclickable");
			}
		})

		//manage the display of the create-GA item
        document.getElementById("createGA").addEventListener("click", () => {
            document.getElementById("chooseGA").classList.toggle("activeClass2");
            document.getElementById("createAlgebra").classList.toggle("activeClass");
        })
		
		els.goBackStart.addEventListener("click", goBackStart);
		function goBackStart(){
			var elsClass = {};
			[".activeClass", ".activeClass2", ".unclickable", ".activeDiv", ".active", ".unactive"].forEach(x => elsClass[x.replace(/[.]/g, '')] = document.querySelectorAll(x));
			for(var i=0; i<elsClass.activeClass.length; i++)
				elsClass.activeClass[i].classList.remove("activeClass");
								
			for(var i=0; i<elsClass.activeClass2.length; i++)
				elsClass.activeClass2[i].classList.remove("activeClass2");
			
			for(var i=0; i<elsClass.unclickable.length; i++)
				elsClass.unclickable[i].classList.remove("unclickable");
				
			for(var i=0; i<elsClass.activeDiv.length; i++)
				elsClass.activeDiv[i].classList.remove("activeDiv");
				
			for(var i=0; i<elsClass.active.length; i++)
				elsClass.active[i].classList.remove("active");
				
			for(var i=0; i<elsClass.unactive.length; i++)
				elsClass.unactive[i].classList.remove("unactive");
		}

        /*els.validate.addEventListener("click",DisplayProjectList)
        function DisplayProjectList(){
            els.projectList.classList.toggle("activeClass");
            els.signIn.classList.toggle("activeClass");
        }*/
		
		document.querySelector("#createAlgebra>.validate>a>i").addEventListener("click", createGA);
		function createGA(){
			// retrieve info form form
			var name = els.formCreateGA.nameGA.value;
			var dimensions = els.formCreateGA.dimensionGA.value;
			var basis = els.formCreateGA.basisGA.value;
			var metric = els.formCreateGA.metricGA.value;
			var vectorsDef = els.formCreateGA.vectorsGA.value;
			var pointDef = els.formCreateGA.pointGA.value;
			// create the GA object
			var userGA = new GA(name, dimensions, basis, metric, vectorsDef, pointDef);
			
			//localStorage
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("createGA", userGA.consoleString());
			} else {
				console.log("Sorry! No Web Storage support.");
			}
		}
		
		// select existing GA
		var GAToChoose = document.querySelectorAll(".choose p");
		for(var i=0; i<GAToChoose.length; i++){
			GAToChoose[i].onclick = (function(i){
				return function(){
					sendGA(GAs.GAArray[i]);
				}
			})(i);
		}
		function sendGA(aGA){
			//localStorage
			if (typeof(Storage) !== "undefined") {
				console.log(aGA.consoleString());
				localStorage.setItem("createGA", aGA.consoleString());
				window.location.replace("index.html");
			} else {
				console.log("Sorry! No Web Storage support.");
			}
		}

        els.check.onclick = () =>{
            account.signIn(true);
        }

        /*document.getElementById("iconExample").addEventListener("click",DisplayExample)
        function DisplayExample(){
            window.open("index.html");
        }*/
		
		// construct GAinfo
		for(var i=0; i<GAToChoose.length; i++){
			GAToChoose[i].onmouseover = (function(i){
				return function(){
					constructGAInfos(GAs.GAArray[i]);
				}
			})(i);
		}
		function constructGAInfos(aGA){
			console.log(aGA.name);
			var description = GA.retrieveGAInfo(aGA.consoleString());
			// if there is a GA description
			els.infoGA.innerHTML="<h4>GA information</h4><p>Basis and Metric</p>";
			if (description!=null){
				var metricTable = document.createElement("table");
				metricTable.appendChild(GA.constructLine(description.basis));
				metricTable.appendChild(GA.constructLine(description.metric));
				
				els.infoGA.appendChild(metricTable);
			}
			// if there isn't a GA description
			else{
				metricTitle.innerHTML = "No Geometric Algebra in the console.";
				els.macrosContent.appendChild(metricTitle);
			}
			
		}
		
		// display GAinfo
		els.GAChoiceDiv.addEventListener("mouseover", displayGAInfo);
		function displayGAInfo(){
			els.infoGA.classList.add("active3");
		}
		
		// hide GAinfo
		els.GAChoiceDiv.addEventListener("mouseleave", hideGAInfo);
		function hideGAInfo(){
			els.infoGA.classList.remove("active3");
		}
		
		