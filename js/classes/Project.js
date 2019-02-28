class Project extends AllProj{
	constructor(id,link,name,role){
		super(name, "____");
		this._id = id;
		this._link = link
		this._srcCode = "";
		this._role = role;
	}

	set setSrcCode(src){
		this._srcCode = src;
	}

	get src(){return this._srcCode;}
	get link(){return this._link;}
	get role(){return this._role;}
	get id(){return this._id;}


	async saveProject(name, src){
		var payload = {
			src: src,
			name: name
		};
		var data = JSON.stringify(payload);

		const req = new Request('https://serene-forest-42732.herokuapp.com/project/create', data, 'POST');
 		let response = await req.send();
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
		const req = new Request('https://serene-forest-42732.herokuapp.com/project/infos', data, 'POST');
 		let response = await req.send();
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
		const req = new Request('https://serene-forest-42732.herokuapp.com/project/changeCode', data, 'PUT');

		let response = await req.send();
		let result = await response.json();

	    var msg = new Message(result.msg,true,null);
	    msg.display();
	}

	async updateShareInfos(){
		var payload = {
			id: this._id
		}
		var data = JSON.stringify(payload);
		const req = new Request('https://serene-forest-42732.herokuapp.com/project/coworkers', data, 'POST');

		let response = await req.send();
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

		const req = new Request('https://serene-forest-42732.herokuapp.com/project/addCoworkers', data, 'POST');
 		let response = await req.send();

		let result = await response.json();
 		if(result.success){
 			this.updateShareInfos();
 		}
 		var mess = new Message(result.msg,true,null);
 		mess.display();	 
	}

	async displayCoworkers(entry){
		var payload = {
			entry: entry
		};
		var data = JSON.stringify(payload);
	}

	async removeCoworkers(username, idProj){
		var payload = {
			username: username,
			id_project: idProj
		};
		var data = JSON.stringify(payload);
		const req = new Request('https://serene-forest-42732.herokuapp.com/project/rmCoworkers', data, 'POST');

		let response = await req.send();
		let result = await response.json();
		
 		if(result.success){
 			this.updateShareInfos();
 		}
 		var mess = new Message(result.msg,true,null);
 		mess.display();
	}
}