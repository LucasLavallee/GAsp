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
	constructor(title, msg, typeInp, callBack, data){ //typeInp : 0 = confirmBox, 1 = input text
		this._msg = msg;
		this._title = title;
		this._typeInp = typeInp;
		this._callBack = callBack;
		this._data = data;
	}

	setAll(title, msg, typeInp, callBack, data){
		this._msg = msg;
		this._title = title;
		this._typeInp = typeInp;
		this._callBack = callBack;
		this._data = data;
	}

	display(){
		var container = document.createElement('div');
		container.id = "modal";
		let allChild = [];
		var leave = document.createElement('div');
		leave.id = "modalLeave";
		leave.innerHTML= "<i class='far fa-times-circle' onclick='Modal.remove()'></i>";
		var realModal = document.createElement('div');
		realModal.id = "realModal";
		var textModal = document.createElement('div');
		textModal.innerHTML = "<h2>"+this._title+"</h2>";
		textModal.innerHTML += "<p id='contentModal'>"+this._msg+"</p>";
		var contButton = document.createElement('div');
		contButton.id="modalButtons";
		allChild = [...allChild,textModal];
		var modal = AppControllerInstance.modal;
		switch(this._typeInp){
			case 0: //Confirm Box
				contButton.innerHTML = "<div class='modalButton' id='modalYes'>Yes</div><div class='modalButton' id='modalNo' onclick='Modal.remove()>No</div>"
				break;
			case 1: //Input text
				var inputModal = document.createElement('div');
				inputModal.innerHTML = "<input type='text' placeholder='Value' id='modalInp'>";
				contButton.innerHTML = "<div class='modalButton' id='modalYes' onclick='AppControllerInstance.modal.callback(\'"+this._data.join()+"\')'>Enter</div>";
				contButton.innerHTML += "<div class='modalButton' id='modalCancel' onclick='Modal.remove()'>Cancel</div>";
				allChild = [...allChild,inputModal];
				break;
		}
		allChild = [...allChild,contButton,leave];
		allChild.map(x=>realModal.appendChild(x));
		container.appendChild(realModal);
		console.log(container)
		document.body.appendChild(container);
	}

	static remove(){
		AppControllerInstance.modal.reset();
		var modal = document.getElementById("modal");
		if(modal!=null)
			modal.parentNode.removeChild(modal);
	}

	reset(){
		this._msg = "";
		this._title = "";
		this._typeInp = -1;
		this._callBack = null;
		this._data = [];
	}
}