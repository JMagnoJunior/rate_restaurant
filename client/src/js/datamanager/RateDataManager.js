import axios from 'axios'


// axios.interceptors.response.use(function (response) { 
//     return response;
//   }, function (error) {
  	
//     if(error.response.status === 401){
// 		document.location = "#/auth"
//     }
//     return error;
//   });

export function create(google_id, rate){
	
	
	return axios.post(process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates", rate)

}

export function listAll(google_id){	

	return axios.get(process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates")


}

// export function verifyUserSession(){
// 	return axios.get("http://localhost:3000/user")
// }