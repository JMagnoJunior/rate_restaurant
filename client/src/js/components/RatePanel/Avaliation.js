import React from "react"


export default class Avaliation extends React.Component{
	constructor(){
		super();		
	}

	render(){		
		return(
			
            	<div> {this.props.comment}, <span> rate: {this.props.stars} </span> </div>
			
		);	
	}
}