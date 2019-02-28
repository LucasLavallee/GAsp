class Request{
	async send(){
		return fetch(this.url,{
			method: this.method,
			body: this.data,
			mode: 'cors',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://serene-forest-42732.herokuapp.com"
			},
			credentials: 'include'
		});
	}

	constructor(url, data, method){
		this.method = method;
		this.url = url;
		this.data = data;
	}
}