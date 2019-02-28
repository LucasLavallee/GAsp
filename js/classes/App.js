class AppController {

    async loadProj(){
        var linkProj = window.location.hash.substr(1);
        if(linkProj!=""){
            this.currentMode = 0;
            var res = await this.mainProject.loadProject(linkProj);
            this.interface.updateEditor(this.mainProject.src);
            this.interface.updateViewer();
            this.mainProject.loadProjInfos(this.mainProject.author,this.mainProject.name);
            if(this.account.state)
                els.sharePanel.style.display = "block";
        }
    }

    preloadIframe(){
            els.exampleView.contentDocument.body.style = "margin:0; padding:0;width:100%; height:100%; margin:0;";
            if(this.currentMode==0){

                //script that contains the ganja.js
                var currentCode = this.interface.editor.getValue();
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
        this.interface = new Interface();
        return AppController.instance;
    }
}

// eslint-disable-next-line no-unused-vars
const AppControllerInstance = new AppController();
