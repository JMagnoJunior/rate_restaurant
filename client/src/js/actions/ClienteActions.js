import dispatcher from "../dispatcher"

import * as  ClienteDataManager from "../datamanager/ClienteDataManager"

export function create(cliente){
		
		ClienteDataManager.create(cliente).then(function(response){
			loadClientes();
			dispatcher.dispatch({
				type: "CREATE_CLIENTE",
				"criado_com_sucesso" : true
			});
		})
		
}

export function loadClientes(){

		ClienteDataManager.listAll().then(function(response){
			dispatcher.dispatch({
				type : "LOAD_CLIENTES" ,
				"cliente" : response.data
			});
		})

}