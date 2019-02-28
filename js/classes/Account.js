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

		const req = new Request('https://serene-forest-42732.herokuapp.com/isLog', null, 'GET');

 		let response = await req.send();
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
		const req = new Request('https://serene-forest-42732.herokuapp.com/logout', null, 'GET');

 		let response = await req.send();
		let data = await response.json();

 		if(data.success) {
 			this.changeData("","",false);
 			document.location.replace('https://lucaslavallee.github.io/GAsp/main.html');
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
						const req = new Request('https://serene-forest-42732.herokuapp.com/signup', data, 'POST');

						let response = await req.send();
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

            const req = new Request('https://serene-forest-42732.herokuapp.com/signin', data, 'POST');
            let response = await req.send();

            let dataUser = await response.json();
           if(dataUser.success){
              	var msg = new Message(dataUser.msg,true,null);
              	msg.display();
              	this.changeData(dataUser.user.email,dataUser.user.username,true);
              	if(!bool){
              			popUp.classList.toggle("active");
              			save.classList.toggle("active");
 						menuAccount.style.display = "block";
 				}
 				else{
                		window.location.replace("./project.html");
 				}

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

		const req = new Request('https://serene-forest-42732.herokuapp.com/project/all', null, 'GET');

         let response = await req.send();
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
            
            if(element.role == 1){
            	div.innerHTML = '<i class="far fa-trash-alt"></i><div class ="rename">rename</div> <a href="https://lucaslavallee.github.io/GAsp/#'+element.link+'"><p> '+element.name+'</p></a> ';
                els.projects1.appendChild(div);
            }
            else if(element.role == 2 || element.role == 3){
            	div.innerHTML = '<a href="https://lucaslavallee.github.io/GAsp/#'+element.link+'"><p> '+element.name+'</p></a> ';
                els.projects2.appendChild(div);
            }
        });
      }
}