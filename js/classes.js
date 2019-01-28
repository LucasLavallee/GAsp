class Account{
	constructor(){
		this._username = "";
		this._mail = "";
		this._state = false; 
		this._listProject = []; 
 	}

 	isLoggedIn(){
 		fetch('https://serene-forest-42732.herokuapp.com/isLog',{
			method: "GET",
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		})
		.then(function(res){return res.json();})
		.then(function(data){
     		var json = JSON.stringify(data);
     		json.success ? this._state = true : this._state = false;
     	})
 	}

	signUp(){
		var mail = document.getElementById('emailUp');
		var user= document.getElementById('userUp');
		var pwd = document.getElementById('passUp');
		var confPwd = document.getElementById('confPassUp');
		var popUp = document.getElementById("pop_up_black");
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

						fetch('https://serene-forest-42732.herokuapp.com/signup',{
							method: "POST",
							body: data,
							mode: 'cors',
							headers: {
								"Accept": "application/json",
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin": "*"
							}
						})
						.then(function(res){return res.json();})
						.then(function(data){
                     var json = JSON.stringify(data);
                     if(json.success){
                           var msg = new Message(json.msg,true,null);
                           msg.display();
                  			popUp.classList.toggle("active");
                           this._username = user.value;
                           this._mail = mail.value;
                           this._state = true;
                     }else{
                           var msg = new Message(json.msg, false, errorForm).display();
                     }
                  })


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

    signIn(){
         var mail = document.getElementById('mailIn');
         var pwd = document.getElementById('passwordIn');
			var popUp = document.getElementById("pop_up_black");
			var errorForm = document.getElementById("errorForm");
            	console.log(popUp);
         if(mail.value!="" && pwd.value!=""){
            var payload = {
               email: mail.value,
               password: pwd.value
            };
            var data = JSON.stringify( payload );

            fetch('https://serene-forest-42732.herokuapp.com/signin',{
               method: "POST",
               body: data,
               mode: 'cors',
               headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
               }
            })
            .then(function(res){return res.json();})
            .then(function(data){
               	  console.log(data);

               if(data.success){
               	  console.log(data);
                  var msg = new Message(data.msg,true,null);
                  msg.display();
                  popUp.classList.toggle("active");
                  this._mail = mail.value;
                  this._state = true; 
               }else{
                  var msg = new Message(json.msg,false,errorForm).display();
               }
            })
         }
         else{
            var msg = new Message("Missing values", false, errorForm).display();
         }
      }



      getAllProject(){
         
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
         msgCont.classList.add('error');
         msgCont.innerHTML = this._msg;
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