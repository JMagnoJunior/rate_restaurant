import dispatcher from "../dispatcher"

import * as  RateDataManager from "../datamanager/RateDataManager"

export function create(google_id, rate){
	
		RateDataManager.create(google_id, rate)
		.then(function(response){			
			dispatcher.dispatch({
				type: "NEW_RATE",
				"rate" : response.data.rates
			});
		})
		.catch(function(err){
			
			if ( err.response.status == 401){
				dispatcher.dispatch({
					type: "AUTH_ERROR",
				});		
			}else{
				dispatcher.dispatch({
					type: "ERROR_CREATION_RATE",
				});	
			}
			
		})
		
}

export function load(google_id){
		RateDataManager.listAll(google_id).then(function(response){			
			dispatcher.dispatch({
				type : "LOAD_RATES" ,
				"rates" : response.data.rates
			});
		})
		.catch(function(err){
			dispatcher.dispatch({
				type : "LOAD_RATES" ,
				"rates" : []
			});
		})

}

export function verifyUserSession(){
	RateDataManager.verifyUserSession().then(function(response){
			dispatcher.dispatch({
				type: "LOGGED",
			});
	}).catch(function(err){
			dispatcher.dispatch({
				type: "NOT_LOGGED",
			});
	})
}