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