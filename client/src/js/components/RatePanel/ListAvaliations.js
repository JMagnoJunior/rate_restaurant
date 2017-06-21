/**
 * This is the way the list of avaliations will be rendered
 *
 * @author Magno Jr <is.magnojr@gmail.com>
 */

import React from "react"
import Avaliation from "./Avaliation"
import RateStore from "../../stores/RateStore"
import * as RateActions from "../../actions/RateActions"


export default class ListAvaliations extends React.Component {
    constructor() {
        super();
        this.state = {
        rates:  RateStore.getAll(),
            filterComments: ""
        }

        this.listeningRate = this.listeningRate.bind(this);
        this.filterComments = this.filterComments.bind(this);
    }

    // every time something changes on the store this component will know
    componentWillMount() {
        RateStore.on("change",this.listeningRate);
    }

    componentWillUnmount() {
        RateStore.removeListener("change", this.listeningRate);
    }

    // When it is mounted it load the information for the selected restaurant
    componentDidMount() {
        RateActions.load(this.props.google_id);
    }

    // if a new restaurant is selected, 
    // this will load a new state with information from the new restaurant
    componentWillReceiveProps(nextProps) {
        if ( this.props.google_id != nextProps.google_id) {
            RateActions.load(nextProps.google_id);
            this.setState({filterComments: null });
        }
    }

    listeningRate() {
        this.setState({rates: RateStore.getAll()});
    }

    filterComments(e) {
        if (e.currentTarget.dataset.stars === "0") {
            this.setState({filterComments: null });
        } else {
            this.setState({filterComments: e.currentTarget.dataset.stars });
        }
    }

    render() {

        let Comments = null;
        let Star5 = 0;
        let Star4= 0;
        let Star3= 0;
        let Star2= 0;
        let Star1= 0;
        let StarTotal = 0;

        if (this.state.rates) {
                Comments = this.state.rates.map((rate, i)=> {
                if (!isEmpty(rate.comment)) {
                        if (this.state.filterComments) {
                                if (rate.stars == this.state.filterComments) {
                                        return  <Avaliation id={rate._id} key={rate._id} comment={rate.comment} stars={rate.stars} />
                                }
                        }
						else {
                                return  <Avaliation id={rate._id} key={rate._id} comment={rate.comment} stars={rate.stars} />
                        }
                }
                return null ;
        });

        if (this.state.rates.every(function(elem){ return elem === null })) {
            Comments = <div class="well " > Leave a comment!</div>
        }

        this.state.rates.forEach(findStars);

        function isEmpty(str) {
            return (!str || 0 === str.length || /^\s*$/.test(str) );
        }

        function findStars(rate) {
            if (rate.stars === 5 ) {
                Star5++;
            }
            if (rate.stars === 4 ) {
                Star4++;
            }
            if (rate.stars === 3 ) {
                Star3++;
            }
            if (rate.stars === 2 ) {
                Star2++;
            }
            if (rate.stars === 1 ) {
                Star1++;
            }
                StarTotal++ ;
            }
        }

        return(
			<div class="panel panel-default">
				<div class="panel-heading">Details</div>
				<div class="panel-body">
							<div class="row"  >
								<label class="col-md-2 col-xs-6 great select"  data-stars="5" onClick={this.filterComments}><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label>  
								<label class="col-md-10 col-xs-6 select"  data-stars="5"  onClick={this.filterComments}  > {Star5} </label> 
							</div>
							<div class="row"   >			
								<label class="col-md-2 col-xs-6 great select" data-stars="4"  onClick={this.filterComments}  ><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label>                                              
								<label class="col-md-10 col-xs-6 select" data-stars="4"  onClick={this.filterComments}  > {Star4}  </label>
							</div>
							<div class="row " >	
								<label  class="col-md-2 col-xs-6 good select" data-stars="3"  onClick={this.filterComments}  > <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label> 																							 
								<label class="col-md-10 col-xs-6 select" data-stars="3"  onClick={this.filterComments}  >  {Star3} </label><br />
							</div>
							<div class="row"  >	
								<label  class="col-md-2 col-xs-6 good select" data-stars="2"  onClick={this.filterComments}  > <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label>																																		  
								<label class="col-md-10 col-xs-6 select" data-stars="2"  onClick={this.filterComments}  >  {Star2}</label>
							</div>	
							<div class="row " >	
								<label  class="col-md-2 col-xs-6  bad select" data-stars="1"  onClick={this.filterComments}   > <span class="glyphicon glyphicon-star"></span ></label> 																																														 
								<label class="col-md-10 col-xs-6 select" data-stars="1"  onClick={this.filterComments}  >  {Star1}  </label>
							</div>
							<br />
							<div class="row">	
								<label class="col-md-2 col-xs-6 select"  data-stars="0"  onClick={this.filterComments}  >Total</label>  <label class="col-md-10 col-xs-6 select" data-stars="0"  onClick={this.filterComments} >  {StarTotal} </label>
							</div>
						<hr />

						<h4>Comments:</h4>
						{Comments}
					
            	</div>
			</div>
		);	
	}
}