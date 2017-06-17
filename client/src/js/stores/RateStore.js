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
	}

	load(rates){
		
		this.rates = rates;
		this.emit("change");
		
	}

	handleActions(action){
		console.log("action recieve" , action)
		switch(action.type){
			case "NEW_RATE":{				
				this.create(action.rate);
				break;
			};
			case "LOAD_RATES":{
				this.load(action.rates);
				break;
			};
		}
	}
	
}

const rateStore = new RateStore;
dispatcher.register(rateStore.handleActions.bind(rateStore))

export default rateStore;