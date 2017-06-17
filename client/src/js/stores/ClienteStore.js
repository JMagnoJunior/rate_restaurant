import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ClienteStore extends EventEmitter{
	constructor(){
		super();
		this.clientes = [];

	}

	getAll(){	

		return this.clientes;
	}

	create(sucesso){
		if(sucesso){
			this.emit("change")
		}
	}

	load(clientes){
		this.clientes = clientes;
		this.emit("change")
	}

	handleActions(action){
		console.log("action recieve" , action)
		switch(action.type){
			case "CREATE_CLIENTE":{
				this.create(action.criado_com_sucesso);
			}
			case "LOAD_CLIENTES":{
				this.load(action.cliente);
			}
		}
	}
	
}



const clienteStore = new ClienteStore;
dispatcher.register(clienteStore.handleActions.bind(clienteStore))

export default clienteStore;