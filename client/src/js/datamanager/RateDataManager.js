/**
 * this is where I call my apis
 *
 * @author Magno Jr <is.magnojr@gmail.com>
 */
import axios from 'axios';

export function create(google_id, rate) {
	
    return axios({
        method: 'post',
        url:  process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates",
        data: rate,
        auth: {
            username: 'raterestaurant',
            password: '123456'
        },
    });

}

export function listAll(google_id) {

    return axios({
        method: 'get',
        url:  process.env.BACKEND_ENV+"restaurants/"+google_id+"/rates",
        auth: {
            username: 'raterestaurant',
            password: '123456'
        },

    })
    
}
