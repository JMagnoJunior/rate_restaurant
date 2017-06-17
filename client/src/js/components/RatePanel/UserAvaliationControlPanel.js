import React from "react"

import * as RateActions from "../../actions/RateActions"
import * as RateStore from "../../stores/RateStore"

export default class UserAvaliationControlPanel extends React.Component{
	constructor(){
		super();
        this.state = {
            stars: "",
            comment: "",
            avaliated: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);   
        this.create = this.create.bind(this)     
	}


    handleInputChange(event){        
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;        
    	this.setState({[name] : value});
    }

    create(){
        var { comment,stars } = this.state;
        RateActions.create( this.props.google_id , { "comment": comment, "stars": stars});
        this.setState({'avaliated' : true});        
    }

	componentWillReceiveProps(nextProps){
		if ( this.props.google_id != nextProps.google_id){
			this.setState({'avaliated' : false});        
		}
	}


    renderAvaliationPanel(){
        return(
            <div class="panel panel-default">
                <div class="panel-heading">Rate this Restaurant!</div>
                <div class="panel-body">                                            
                        {/*I'm not that good with css. I just get this from internet*/}
                        <div class="stars form-group">
                                <input class="star star-5" id="star-5" type="radio" ref="stars" name="stars" value="5" onChange={this.handleInputChange} /> <label class="star star-5" for="star-5"></label>
                                <input class="star star-4" id="star-4" type="radio" ref="stars" name="stars" value="4" onChange={this.handleInputChange} /> <label class="star star-4" for="star-4"></label>
                                <input class="star star-3" id="star-3" type="radio" ref="stars" name="stars" value="3" onChange={this.handleInputChange} /> <label class="star star-3" for="star-3"></label>
                                <input class="star star-2" id="star-2" type="radio" ref="stars" name="stars" value="2" onChange={this.handleInputChange} /> <label class="star star-2" for="star-2"></label>
                                <input class="star star-1" id="star-1" type="radio" ref="stars" name="stars" value="1" onChange={this.handleInputChange} /> <label class="star star-1" for="star-1"></label>								
                        </div>
                        <div class="form-group">
                            <textArea  class="form-control"  rows="4"  id="comment" ref="comment" name="comment" onChange={this.handleInputChange} >
                            </textArea>
                        </div>
                        <button class="btn btn-primary" onClick={this.create} >Confirm</button>                                            
                </div>
            </div>
		);	
    }

    renderResultAvaliation(){
        return (
            <div>
                <h3 class="alert alert-success text-center">Thank you for vote!</h3>
            </div>
        )
    }

	render(){
        if(!this.state.avaliated){
            return this.renderAvaliationPanel();
        }else{
            return this.renderResultAvaliation();
        }
	}
}