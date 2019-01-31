class Project{
	constructor(id,link,name,role){
		this._id = id;
		this._link = link
		this._srcCode = "";
		this._name = name;
		this._role = role;
		this._author = "";
	}

	set setSrcCode(src){
		this._srcCode = src;
	}
	set setName(name){
		this._name = name;
	}

	get src(){return this._srcCode;}
	get name(){return this._name;}
	get link(){return this._link;}
	get role(){return this._role;}
	get id(){return this._id;}
	get author(){return this._author;}


	async saveProject(name, src){
		var payload = {
			src: src,
			name: name
		};
		var data = JSON.stringify(payload);

 		let response = await fetch('https://serene-forest-42732.herokuapp.com/project/create',{
			method: 'POST',
			body: data,
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});

		let result = await response.json();
 		if(result.success){
 			window.location.replace("https://lucaslavallee.github.io/GAsp#"+result.link);
 			menuAccount.style.display = "block";
 		}
 		else{
 		}	 
	}

	async loadProject(link){
		var payload = {
			link: link
		};
		var data = JSON.stringify( payload );

 		let response = await fetch('https://serene-forest-42732.herokuapp.com/project/infos',{
			method: 'POST',
			body: data,
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});

		let result = await response.json();
 		if(result.success){
 			result.projects[0].id_project
	 		this._id = result.projects[0].id;
			this._link = result.projects[0].link;
			this._srcCode = result.projects[0].srcCode;
			this._name = result.projects[0].name;
			this._author = result.projects[0].username;
 		}
 		else{
 		}	
	}

	async updateProject(src){
		var payload = {
			src: src,
			link: this._link
		}
		var data = JSON.stringify(payload);
		let response = await fetch('https://serene-forest-42732.herokuapp.com/project/changeCode',{
			method: 'PUT',
			body: data,
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});

		let result = await response.json();
	    var msg = new Message(result.msg,true,null);
	    msg.display();
	}

	async updateShareInfos(){
		var payload = {
			id: this._id
		}
		var data = JSON.stringify(payload);
		let response = await fetch('https://serene-forest-42732.herokuapp.com/project/coworkers',{
			method: 'POST',
			body: data,
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});

		let coworks = await response.json();
		document.getElementById('linkShare').value = "https://lucaslavallee.github.io/GAsp/#"+this._link;
		var list = document.getElementById('allCoworkers');
		if(coworks.success){
			list.innerHTML = "";
			coworks.projects.forEach(function(element) {
	            var div = document.createElement('div');
	            div.classList.add('coworkers');
	            div.innerHTML = '<p>'+element.username+'</p>';
	            list.appendChild(div);
	        });
	    }
	    else{
	    	list.innerHTML = "(empty)";
	    }
	}

	async addCoworkers(username, idProj){
		var payload = {
			username: username,
			id_project: idProj
		};
		var data = JSON.stringify(payload);

 		let response = await fetch('https://serene-forest-42732.herokuapp.com/project/addCoworkers',{
			method: 'POST',
			body: data,
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});

		let result = await response.json();
 		if(result.success){
 			this.updateShareInfos();
 		}
 		var mess = new Message(result.msg,true,null);
 		mess.display();	 
	}
}

class Account{
	constructor(){
		this._username = "";
		this._mail = "";
		this._state = false; 
		this._listProject = []; 
 	}
 	get state(){ return this._state;}
 	get mail(){ return this._mail;}
 	get username(){ return this._username;}
 	get projects(){return this._listProject;}

 	async isLoggedIn(){
 		var menuAccount = document.getElementById("menuAccount");
 		var share = document.getElementById("sharePanel");
 		let response = await fetch('https://serene-forest-42732.herokuapp.com/isLog',{
			method: 'GET',
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});
		let data = await response.json();
 		if(data.success){
 			this._state = true;
 			menuAccount.style.display = "block";
 		}
 		else{
 			this._state = false;
 			menuAccount.style.display = "none";
 		}	 
 	}

 	async logout(){
 		let response = await fetch('https://serene-forest-42732.herokuapp.com/logout',{
			method: 'GET',
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});
		let data = await response.json();
 		if(data.success) {
 			this.changeData("","",false);
 			document.location.replace('https://lucaslavallee.github.io/GAsp/');
 		} 
 	}

	async signUp(){
 		var menuAccount = document.getElementById("menuAccount");
		var mail = document.getElementById('emailUp');
		var user= document.getElementById('userUp');
		var pwd = document.getElementById('passUp');
		var confPwd = document.getElementById('confPassUp');
		var popUp = document.getElementById("pop_up_black");
		var save = document.getElementById("save");
		var errorForm = document.getElementById("errorForm");

		if(mail.value!="" && user.value!="" && pwd.value!="" && confPwd.value!=""){
			if (/^([a-z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/.test(mail.value)){ //Checking mail
				if(user.value.length>=5){
					if(pwd.value==confPwd.value){
						var payload = {
							email: mail.value,
							username: user.value,
							password: pwd.value
						};
						/*var data = new FormData();
						data.append( "json", JSON.stringify( payload ) );*/

						var data = JSON.stringify( payload );

						let response = await fetch('https://serene-forest-42732.herokuapp.com/signup',{
							method: 'POST',
							body: data,
							mode: 'cors',
							headers: {
								"Accept": "application/json",
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
							},
							credentials: 'include'
						});
						let dataUser = await response.json();
						
	                     if(dataUser.success){
	                           	var msg = new Message(dataUser.msg,true,null);
	                           	msg.display();
	                  			popUp.classList.toggle("active");
	                  			save.classList.toggle("active");
 								menuAccount.style.display = "block";
	                  			this.changeData(dataUser.user.email,dataUser.user.username,true);
	                     }else{
	                           var msg = new Message(dataUser.msg, false, errorForm).display();
	                     }
					}
					else{
                  		var msg = new Message("Different password", false, errorForm).display();
					}
				}
				else{
               		var msg = new Message("Username is too short (5 characters min)", false, errorForm).display();
				}
			}
			else{
            	var msg = new Message("Invalid email", false, errorForm).display();
			}
		}
		else{
         	var msg = new Message("Missing values", false, errorForm).display();
		}
	}

	  changeData(mail,username,state){
	  		console.log(mail + " " + username + " " + state);
	    	this._mail = mail;
	      	this._username = username;
	      	this._state = state;
	  }
    async signIn(bool){
        var mail = document.getElementById('mailIn');
        var pwd = document.getElementById('passwordIn');
		var errorForm = document.getElementById("errorForm");
		if(!bool){
				var save = document.getElementById("save");
				var popUp = document.getElementById("pop_up_black");
 				var menuAccount = document.getElementById("menuAccount");
		}
            
         if(mail.value!="" && pwd.value!=""){
            var payload = {
               email: mail.value,
               password: pwd.value
            };
            var data = JSON.stringify( payload );
            let response = await fetch('https://serene-forest-42732.herokuapp.com/signin',{
               method: 'POST',
               body: data,
               mode: 'cors',
               headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
               },
				credentials: 'include'

            });

            let dataUser = await response.json();
           if(dataUser.success){
              	var msg = new Message(dataUser.msg,true,null);
              	msg.display();
              	if(!bool){
              			popUp.classList.toggle("active");
              			save.classList.toggle("active");
 						menuAccount.style.display = "block";
 				}
 				else{
                		window.location.replace("../project.html");
 				}
              	this.changeData(dataUser.user.email,dataUser.user.username,true);

              	//
           	}else{
              	var msg = new Message(dataUser.msg,false,errorForm).display();
           	}
         }
         else{
            var msg = new Message("Missing values", false, errorForm).display();
         }
      }


      async getAllProject(){
         let response = await fetch('https://serene-forest-42732.herokuapp.com/project/all',{
			method: 'GET',
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});
		let data = await response.json();
 		for(var i = 0; i< data.projects.length; i++){
 			this._listProject[i] = new Project(data.projects[i].id_project,data.projects[i].link,data.projects[i].name,data.projects[i].role);
 		}
 		this.displayAllProject();
      }

      displayAllProject(){
        this._listProject.forEach(function(element) {
            var div = document.createElement('div');

            div.classList.add('project');
            div.innerHTML = '<i class="far fa-trash-alt"></i><div class ="rename">rename</div> <a href="https://lucaslavallee.github.io/GAsp/#'+element.link+'"><p> '+element.name+'</p></a> ';
            if(element.role == 1){
                els.projects1.appendChild(div);
            }
            else if(element.role == 2 || element.role == 3){
                els.projects2.appendChild(div);
            }
        });
      }
}

class Message{
	constructor(msg,typeCont,container){
		this._msg = msg;
		this._lvlError = 0;
		this._typeContainer = typeCont;
		this._container = container;
	}
	display(){
		if(this._typeContainer){
			var msgCont = document.getElementById('error');
			msgCont.classList.add("error");
			//Reset css animation
			var newone = msgCont.cloneNode(true);
			msgCont.parentNode.replaceChild(newone, msgCont);
         	newone.innerHTML = this._msg;
		}else{
         this._container.innerHTML = this._msg; 
		}
	}
}

class Modal{
	//Constructor
	constructor(name){
		this._name = name;
		this._content = "";
		this._footer = "";
		this._state = 0; //0 = close | 1 = open
	}

	display(){

		var modal = document.createElement('div');
		modal.className = "modal";

		var subModal =  document.createElement('div');
		subModal.className = "modalSub";

		var header = document.createElement('div');
		header.className = "modalHeader";
		var content =  document.createElement('div');
		content.className = "modalContent";
		var footer =  document.createElement('div');
		footer.className = "modalFooter";

		header.innerHTML = "<span id='leaveModal' onclick='Modal.close();'>X</span><h2>"+this._name+"</h2>";
		content.innerHTML = this._content;
		footer.innerHTML = this._footer;

		subModal.appendChild(header);
		subModal.appendChild(content);
		subModal.appendChild(footer);
		modal.appendChild(subModal);

		document.body.appendChild(modal);
	}

	static close(){
		var modal = document.querySelectorAll(".modal")[0];
		document.body.removeChild(modal);
	}

	set content(content){
		return this._content = content;
	}
	set footer(footer){
		return this._footer = footer;
	}
	set state(state){
		return this._state = state;
	}
}