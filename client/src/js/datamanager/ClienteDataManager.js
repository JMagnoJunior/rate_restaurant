import axios from 'axios'


axios.interceptors.response.use(function (response) { 
    return response;
  }, function (error) {
  	
    if(error.response.status === 401){
		document.location = "#/auth"
    }
    return error;
  });

export function create(cliente){
	return axios.post("http://localhost:3000/clientes", cliente)

}

export function listAll(){
	return axios.get("http://localhost:3000/clientes");
}