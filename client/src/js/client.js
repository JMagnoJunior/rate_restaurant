import React from "react"
import ReactDOM from "react-dom"

import RatePanel from "./components/RatePanel/RatePanel"
// import Auth from "./componentes/Infra/Auth/Auth"
import { Router, Route, hashHistory } from 'react-router'


class App extends React.Component{
	constructor(){
		super();

	}

	
	render() {
		return (
			<div> 
				<RatePanel google_id={$("#id_restaurant").val()} />	  	
			</div>
		);
	}
	
}

 




$("#id_restaurant").change(function(){
	
		ReactDOM.render((
			<App />
		), document.getElementById('app'))

})

// ReactDOM.render((
// 		<Router history={hashHistory}>
// 			<Route path="/" component={App}/>
// 		</Router>
// 	), document.getElementById('app'))