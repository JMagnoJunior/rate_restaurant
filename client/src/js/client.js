/**
 * It just render the rate panel and include the id from google map as atribute of my react components.  
 * 
 * @author Magno Jr <is.magnojr@gmail.com>
 */

"use strict";

require('./maps.js')

import React from "react"
import ReactDOM from "react-dom"
import RatePanel from "./components/RatePanel/RatePanel"

class App extends React.Component{

    constructor(){
        super();
    }

    render() {
        return(
			<div> 
                <RatePanel google_id={$("#id_restaurant").val()} />	  	
			</div>
		);
	}

}

$("#id_restaurant").change(function(){	
    ReactDOM.render((<App />), document.getElementById('app'))
})