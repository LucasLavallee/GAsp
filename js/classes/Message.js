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