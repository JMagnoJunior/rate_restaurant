import React from "react"


import Avaliation from "./Avaliation"

import RateStore from "../../stores/RateStore"
import * as RateActions from "../../actions/RateActions"



export default class ListAvaliations extends React.Component{
	constructor(){
		super();
		this.state = {
			rates :  RateStore.getAll(),
		}
		this.listeningRate = this.listeningRate.bind(this)
	}

	componentWillMount(){		
        RateStore.on("change",this.listeningRate);
    }

    componentWillUnmount(){				
        RateStore.removeListener("change", this.listeningRate);
    }

	componentDidMount(){
		RateActions.load(this.props.google_id)
	}

	listeningRate(){		
		this.setState({rates: RateStore.getAll()})
	}

	componentWillReceiveProps(nextProps){
		if ( this.props.google_id != nextProps.google_id){
			RateActions.load(nextProps.google_id)
		}
	}

	render(){
		
		let Comments = null;
		let Star5 = 0; 
		let Star4= 0; 
		let Star3= 0; 
		let Star2= 0; 
		let Star1= 0; 
		let StarTotal = 0;

		if(this.state.rates){
			Comments = this.state.rates.map((rate, i)=> {
				return <Avaliation id={rate._id} key={rate._id} comment={rate.comment} stars={rate.stars}  />
			});

			this.state.rates.forEach(findStars)

			function findStars(rate){		
				if(rate.stars === 5 ){
					Star5++
				}
				if(rate.stars === 4 ){
					Star4++
				}
				if(rate.stars === 3 ){
					Star3++
				}
				if(rate.stars === 2 ){
					Star2++
				}
				if(rate.stars === 1 ){
					Star1++
				}
				StarTotal++ 
			}
				
			
		}

		return(
		
			<div class="panel panel-default">
				<div class="panel-heading">Details</div>
				<div class="panel-body">
							<div class="row">			
								<label class="col-md-2 col-xs-6 great" ><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label>  
								<label class="col-md-10 col-xs-6" > {Star5} </label> 
							</div>
							<div class="row">			
								<label class="col-md-2 col-xs-6 great"  ><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label>                                              
								<label class="col-md-10 col-xs-6" > {Star4}  </label>
							</div>
							<div class="row">	
								<label  class="col-md-2 col-xs-6 good" > <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label> 																							 
								<label class="col-md-10 col-xs-6" >  {Star3} </label><br />
							</div>
							<div class="row">	
								<label  class="col-md-2 col-xs-6 good" > <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label>																																		  
								<label class="col-md-10 col-xs-6" >  {Star2}</label>
							</div>	
							<div class="row">	
								<label  class="col-md-2 col-xs-6  bad" > <span class="glyphicon glyphicon-star"></span ></label> 																																														 
								<label class="col-md-10 col-xs-6" >  {Star1}  </label>
							</div>
							<br />
							<div class="row">	
								<label class="col-md-2 col-xs-6" >Total</label>  <label class="col-md-10 col-xs-6" >  {StarTotal} </label>
							</div>
						<hr />

						<h4>Comments:</h4>
						{Comments}
					
            	</div>
			</div>
			
			
		);	
	}
}