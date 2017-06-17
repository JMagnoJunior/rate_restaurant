import React from "react"

import UserAvaliationControlPanel from  "./UserAvaliationControlPanel"
import ListAvaliations from  "./ListAvaliations"

export default class RatePanel extends React.Component{
	constructor(){
		super();		
	}

	render(){		
		return(
			<div>
				<ListAvaliations google_id={this.props.google_id} />
				<UserAvaliationControlPanel google_id={this.props.google_id} />
			</div>
		);	
	}
}