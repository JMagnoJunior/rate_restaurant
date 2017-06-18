import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class RateStore extends EventEmitter{
	constructor(){
		super();
		this.rates = [];
	}

	getAll(){
		return this.rates;
	}

	create(rate){
		this.rates = rate;
		this.emit("change");
		this.emit("created", true);
	}

	sendErrorCreation(){
		this.emit("created", false);
	}

	load(rates){		
		this.rates = rates;
		this.emit("change");		
	}

	redirectLogin(){
		this.emit("redirectLogin")
	}	

	handleActions(action){
		console.log("action recieve" , action)		
		switch(action.type){
			case "NEW_RATE":{				
				this.create(action.rate);
				break;
			};
			case "ERROR_CREATION_RATE":{				
				this.sendErrorCreation();
				break;
			};
			case "LOAD_RATES":{
				this.load(action.rates);
				break;
			};
			case "AUTH_ERROR":{
				this.redirectLogin();
				break;
			};
			case "LOGGED":{
				this.emit("userSession", true)
			};
			case "NOT_LOGGED":{
				this.emit("userSession", false)
			}
		}
	}
	
}

const rateStore = new RateStore;
dispatcher.register(rateStore.handleActions.bind(rateStore))

export default rateStore;