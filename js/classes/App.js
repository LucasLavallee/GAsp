class AppController {

    get algebra(){
        return this.mainProject.algebra;
    }

    async loadProj(){
        var linkProj = window.location.hash.substr(1);
        if(linkProj!=""){
            this.currentMode = 0;
            var res = await this.mainProject.loadProject(linkProj);

            this.interface = new Interface(this.mainProject.language);
            this.interface.updateEditor(this.mainProject.src);
            this.interface.updateViewer();
            this.mainProject.loadProjInfos();
            this.mainProject.updateGA(this.mainProject.src);
            if(this.account.state)
                els.sharePanel.style.display = "block";
        }
        else if(window.localStorage.length>0 && window.localStorage.getItem('newGA') != null){
            this.currentMode = 0;
            const lang = window.localStorage.getItem('language');
            this.mainProject.setLanguage(lang);
            this.interface = new Interface(lang);
            if(lang!="gaViewer"){
                const stringGA = window.localStorage.getItem('newGA');
                let newGa = JSON.parse(stringGA);
                const code = this.mainProject.algebra.buildAlgebraCode(newGa.name, newGa.dim, newGa.basis, newGa.metric, newGa.vector, newGa.point);
            
                this.interface = new Interface(lang);
                this.preloadIframe();
                this.interface.updateEditor(code);
                this.interface.updateViewer();
                this.mainProject.updateGA(code);
            }
            else{
                this.mainProject.algebra.setAlgebra(4,1,0);
            }
            window.localStorage.clear();
        }
    }

    preloadIframe(){
            els.exampleView.contentDocument.body.style = "margin:0; padding:0;width:100%; height:100%; margin:0;";
            console.log("In preloadIframe")
        
            if(this.currentMode==0){

                //script that contains the ganja.js
                var scriptGJ= document.createElement('script');
                scriptGJ.type = "text/javascript";
                scriptGJ.src = "./js/lib/ganja.js/ganja.js";
                els.exampleView.contentDocument.getElementsByTagName("head")[0].appendChild(scriptGJ);

                //script that contains the ganja.js
                var currentCode = this.interface.editor.getValue();
                var script= document.createElement('script');
                script.innerHTML = currentCode;
                els.exampleView.contentDocument.body.appendChild(script);
                this.interface.viewer.currentScript = script;
            }
            
            this.interface.viewer.resize();
        }
    init() {
        this.account.isLoggedIn();
        this.loadProj();
        this.interface.init(this.currentMode);
        //this.preloadIframe();
    }

    /**
     * @brief Singleton constructor
     */
    constructor() {
        if (!AppController.instance) {
            AppController.instance = this;
        }

        this.macroDeploy = false;
        this.currentMode = 1; // 0 = project Mode | 1 = Example Mode 
        this.account = new Account();
        this.mainProject = new Project(0,"","---",0);
        this.interface = new Interface('js');
        this.modal = new Modal("", "", -1, null, []);
        return AppController.instance;
    }
}

// eslint-disable-next-line no-unused-vars
const AppControllerInstance = new AppController();
