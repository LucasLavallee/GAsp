const els={};
["#iconOpen", "#iconCreate", "#signIn", "#chooseGA","#validate","#projectList","#goBackStart",
"#formCreateGA","#check","#infoGA","#GAChoiceDiv", "#createGA"].forEach(x=>els[x.replace(/[.#]/g,'')]=document.querySelector(x));
changeActive = (element) => {
    element.classList.toggle("active");
}
changeUnactive = (element) => {
    element.classList.toggle("unactive");
}
changeActiveThis = (element) => {
    element.classList.toggle("activeThis");
}
const selectLanguage = (nameGA, language) => {
	console.log("ga");
	const ga = AlgebraController.existingGAs.find(ga => ga.name === nameGA);
	if (typeof(Storage) !== "undefined") {
		window.localStorage.clear();
		window.localStorage.setItem("language",language);
		AlgebraController.setLocalStorage(ga.name, ga.dimensions, null, null, null, null);
		//window.localStorage.setItem("GA_name", name);
		window.location.replace("./index.html");

		/*const name = AlgebraController.existingGAs[i].name;
		const dimensions = AlgebraController.existingGAs[i].dimensions;
		const toSend = AlgebraController.consoleString(name, dimensions);
		localStorage.setItem("createGA", toSend);
		window.location.replace("index.html");*/
	} else {
		console.log("Sorry! No Web Storage support.");
	}
}
// construct the list of existing GA in the DOM
AlgebraController.existingGAs.map( GA => {
	const newDiv = document.createElement("div");
	newDiv.classList.add("listChoosableGA");
	const newNode = document.createElement("p");
	newNode.innerHTML = GA.name;
	const divLang = document.createElement("div");
	divLang.classList.add("choosableLang");
	GA.language.map(lang => {
		const val = document.createElement("p");
		val.innerHTML = lang;
		val.setAttribute("onclick",`selectLanguage('${GA.name}','${lang}')`);
		divLang.appendChild(val);
	})
	newDiv.appendChild(newNode);
	newDiv.appendChild(divLang);
	els.GAChoiceDiv.appendChild(newDiv);
})
		
var account = new Account();
account.isLoggedIn();

				
/*//// EVENT LISTENERS ////*/

// Manage the motion of the circles items
const elsClass = {};
[".circleBase", ".type1"].forEach(x => elsClass[x.replace(/[.]/g, '')] = document.querySelectorAll(x));
for (let i = 0; i < elsClass.circleBase.length; i++) {
	elsClass.circleBase[i].onclick = ((i) => {
		return () => {
		// index i for the clicked div and index (i+1)%3 and (i+2)%3 for the others
			if (elsClass.circleBase[i].classList.contains("indexPage"))
				changeActiveThis(elsClass.circleBase[i]);
			else if (elsClass.circleBase[i].classList.contains("active")==false){
				changeActive(elsClass.circleBase[i]);
				document.getElementById("icons").classList.toggle("activeDiv");
				changeUnactive(elsClass.circleBase[(i + 1) % 3]);
				changeUnactive(elsClass.circleBase[(i + 2) % 3]);
			}
		}
	})(i);
}
		
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
els.createGA.addEventListener("click", () => {
    document.getElementById("chooseGA").classList.toggle("activeClass2");
    document.getElementById("createAlgebra").classList.toggle("activeClass");
 })
		
// manage the return to the home menu when clicking on the left-top icon
els.goBackStart.addEventListener("click", () => {
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
})

        /*els.validate.addEventListener("click",DisplayProjectList)
        function DisplayProjectList(){
            els.projectList.classList.toggle("activeClass");
            els.signIn.classList.toggle("activeClass");
        }*/
		
// put the information from the GA form and store it in the local storage,
// and then sends us to a new project
document.querySelector("#createAlgebra>.validate>a>i").addEventListener("click", () =>{
	// retrieve info form form
	const name = els.formCreateGA.nameGA.value;
	const dimensions = els.formCreateGA.dimensionGA.value;
	const basis = els.formCreateGA.basisGA.value;
	const metric = els.formCreateGA.metricGA.value;
	const vectorsDef = els.formCreateGA.vectorsGA.value;
	const pointDef = els.formCreateGA.pointGA.value;
	
	//localStorage
	if (typeof(Storage) !== "undefined") {
		window.localStorage.clear();
		AlgebraController.setLocalStorage(name, dimensions, basis, metric, vectorsDef, pointDef);
		window.location.replace("./index.html");
	} else {
		console.log("Sorry! No Web Storage support.");
	}
})

        els.check.addEventListener("click", () =>{
            account.signIn(true);
        })
		
