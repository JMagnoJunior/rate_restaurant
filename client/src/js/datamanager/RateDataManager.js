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
	
	return axios({
		method: 'post',
          url:  process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates",
          data: rate,
          auth: {
            username: 'raterestaurant',
            password: '123456'
          },
		//   withCredentials: true
	})
	// return axios.post(process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates", rate)

}

export function listAll(google_id){	


	return axios({
		method: 'get',
          url:  process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates",
          auth: {
            username: 'raterestaurant',
            password: '123456'
          },
		//   withCredentials: true
	})
	// return axios.get(process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates")


}

// export function verifyUserSession(){
// 	return axios.get("http://localhost:3000/user")
// }