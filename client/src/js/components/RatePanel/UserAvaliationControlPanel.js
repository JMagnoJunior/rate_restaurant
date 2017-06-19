import React from "react"

import * as RateActions from "../../actions/RateActions"
import RateStore from "../../stores/RateStore"
import EmailInputTextCustom from "../InputCustom/EmailInputTextCustom"

export default class UserAvaliationControlPanel extends React.Component{
	constructor(){
		super();
        this.state = {
            stars: "",
            comment: "",
            user_name: "",
            user_email: "",
            avaliated: false,
            showError: false
        };
        this.listeningCreationRate = this.listeningCreationRate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStarChange = this.handleStarChange.bind(this);
        this.changeMail = this.changeMail.bind(this)
        this.create = this.create.bind(this);  
	}

    componentWillMount(){		
        RateStore.on("created",this.listeningCreationRate);
    }

    componentWillUnmount(){				
        RateStore.removeListener("created", this.listeningCreationRate);
    }

    componentWillReceiveProps(nextProps){
		if ( this.props.google_id != nextProps.google_id){
            this.setState({stars : ""});
            this.setState({comment : ""});
            this.setState({user_name : ""});
            this.setState({user_email : ""});
            this.setState({avaliated : false});
            this.setState({showError : false});
		// 	this.setState({'avaliated' : false});
        //     this.clean();
        //     if(this.refs.comment){
        //         this.refs.comment.value = "";
        //     }
        //     if(this.refs.user_name){
        //         this.refs.user_name.value = "";
        //     }
            
		}
	}

    listeningCreationRate(success){		
        if(!success){
            this.setState({'showError' : true});
            this.setState({'avaliated' : false});            
        }else{            
            this.setState({'showError' : false});
            this.setState({'avaliated' : true}); 
        }                       
	}


    handleInputChange(event){        
    	const target = event.target;        
    	const value = target.value;
    	const name = target.name;        
    	this.setState({[name] : value});
    }

    handleStarChange(e){
        
        this.setState({'stars':e.target.value})
        // e.preventDefault();
    }

    changeMail(mail, valid){
        this.setState({user_email:mail})
    }

    create(){
        const { comment,stars, user_name, user_email } = this.state;        
        RateActions.create( this.props.google_id , { "comment": comment, "stars": stars, "user_name": user_name, "user_email":user_email});              
    }
    

    renderAvaliationPanel(){
        let ErrorMsg = ""; 
        if(this.state.showError){
            ErrorMsg = (<div id="msgError" class="alert alert-danger text-center">
                            <p>There is something wrong with your vote.<br /> Please, try again. Select at least one star!</p>
                       </div>)
        }
        return(
            <div id="panelAvaliation" class="panel panel-default">
                <div class="panel-heading">Rate this Restaurant!</div>
                <div class="panel-body"> 
                        { ErrorMsg }                        
                        {/*I'm not that good with css. I just get this from internet*/}
                        <div class="stars form-group">
                                <input class="star star-5" id="star-5" type="radio" ref="stars" name="stars" defaultValue="5" checked={this.state.stars == 5}  onChange={this.handleStarChange} /> <label class="star star-5" for="star-5"></label>
                                <input class="star star-4" id="star-4" type="radio" ref="stars" name="stars" defaultValue="4" checked={this.state.stars == 4}  onChange={this.handleStarChange} /> <label class="star star-4" for="star-4"></label>
                                <input class="star star-3" id="star-3" type="radio" ref="stars" name="stars" defaultValue="3" checked={this.state.stars == 3}  onChange={this.handleStarChange} /> <label class="star star-3" for="star-3"></label>
                                <input class="star star-2" id="star-2" type="radio" ref="stars" name="stars" defaultValue="2" checked={this.state.stars == 2}  onChange={this.handleStarChange} /> <label class="star star-2" for="star-2"></label>
                                <input class="star star-1" id="star-1" type="radio" ref="stars" name="stars" defaultValue="1" checked={this.state.stars == 1}  onChange={this.handleStarChange} /> <label class="star star-1" for="star-1"></label>								
                        </div>
                        <div class="form-group">
                            <label>Comment</label>
                            <textArea  class="form-control"  rows="4"  id="comment" ref="comment" name="comment" value={this.state.comment} onChange={this.handleInputChange} >
                            </textArea>
                        </div>
                        <div class="form-group">
                            <label>User</label>
                            <input class="form-control"  type="text"  id="user_name" ref="user_name" name="user_name" value={this.state.user_name}  onChange={this.handleInputChange} />
                        </div>

                        {/*<div class="form-group">*/}
                            {/*<input class="form-control"  type="text"  id="user_email" ref="user_email" name="user_email" onChange={this.handleInputChange} />*/}
                            <EmailInputTextCustom   id="user_email" ref="user_email" name="user_email" valor={this.state.user_email} msgErro="Invalid email" change={this.changeMail} foi_submetido={this.state.showError}/>
                        {/*</div>*/}
                        
                        <button class="btn btn-primary" onClick={this.create} >Confirm</button>                                            
                </div>
            </div>
		);	
    }

    renderResultAvaliation(){        
        return (
            <div>
                <h3 id="msgConfirmation" class="alert alert-success text-center">Thank you for voting!</h3>
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



// export default class UserAvaliationControlPanel extends React.Component{
// 	constructor(){
// 		super();
//         this.state = {
//             stars: "",
//             comment: "",
//             user_name: "",
//             user_email: "",
//             avaliated: false,
//             showError: false
//         };
//         this.listeningCreationRate = this.listeningCreationRate.bind(this);
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.changeMail = this.changeMail.bind(this)
//         this.create = this.create.bind(this);  
// 	}

//     componentWillMount(){		
//         RateStore.on("created",this.listeningCreationRate);
//     }

//     componentWillUnmount(){				
//         RateStore.removeListener("created", this.listeningCreationRate);
//     }

//     listeningCreationRate(success){		
//         if(!success){
//             this.setState({'showError' : true});
//             this.setState({'avaliated' : false});
            
//         }else{            
//             this.setState({'showError' : false});
//             this.setState({'avaliated' : true});            
//             this.setState({stars : ""});
//             this.setState({comment : ""});
//             this.setState({user_name : ""});
//             this.setState({user_email : ""});
//             this.setState({avaliated : true});
//             this.setState({showError : false});
//         }        
// 	}


//     handleInputChange(event){        
//     	const target = event.target;        
//     	const value = target.value;
//     	const name = target.name;        
//     	this.setState({[name] : value});
//     }
//     changeMail(mail, valid){
//         this.setState({user_email:mail})
//     }
    

    // clean(){
    //     this.setState({stars : ""});
    //     this.setState({comment : ""});
    //     this.setState({user_name : ""});
    //     this.setState({user_email : ""});
    //     this.setState({avaliated : false});
    //     this.setState({showError : false});
    // }

// 	componentWillReceiveProps(nextProps){
// 		if ( this.props.google_id != nextProps.google_id){
// 			this.setState({'avaliated' : false});
//             this.clean();
//             if(this.refs.comment){
//                 this.refs.comment.value = "";
//             }
//             if(this.refs.user_name){
//                 this.refs.user_name.value = "";
//             }
            
// 		}
// 	}


//     create(){
//         const { comment,stars, user_name, user_email } = this.state;
        
//         RateActions.create( this.props.google_id , { "comment": comment, "stars": stars, "user_name": user_name, "user_email":user_email});  
        
        
//     }

//     renderAvaliationPanel(){
//         let ErrorMsg = ""; 
//         if(this.state.showError){
//             ErrorMsg = (<div id="msgError" class="alert alert-danger text-center">
//                             <p>There is something wrong with your vote.<br /> Please, try again. Select at least one star!</p>
//                        </div>)
//         }
//         return(
//             <div id="panelAvaliation" class="panel panel-default">
//                 <div class="panel-heading">Rate this Restaurant!</div>
//                 <div class="panel-body"> 
//                         { ErrorMsg }                        
//                         {/*I'm not that good with css. I just get this from internet*/}
//                         <div class="stars form-group">
//                                 <input class="star star-5" id="star-5" type="radio" ref="stars" name="stars" value="5" onChange={this.handleInputChange} /> <label class="star star-5" for="star-5"></label>
//                                 <input class="star star-4" id="star-4" type="radio" ref="stars" name="stars" value="4" onChange={this.handleInputChange} /> <label class="star star-4" for="star-4"></label>
//                                 <input class="star star-3" id="star-3" type="radio" ref="stars" name="stars" value="3" onChange={this.handleInputChange} /> <label class="star star-3" for="star-3"></label>
//                                 <input class="star star-2" id="star-2" type="radio" ref="stars" name="stars" value="2" onChange={this.handleInputChange} /> <label class="star star-2" for="star-2"></label>
//                                 <input class="star star-1" id="star-1" type="radio" ref="stars" name="stars" value="1" onChange={this.handleInputChange} /> <label class="star star-1" for="star-1"></label>								
//                         </div>
//                         <div class="form-group">
//                             <label>Comment</label>
//                             <textArea  class="form-control"  rows="4"  id="comment" ref="comment" name="comment" onChange={this.handleInputChange} >
//                             </textArea>
//                         </div>
//                         <div class="form-group">
//                             <label>User</label>
//                             <input class="form-control"  type="text"  id="user_name" ref="user_name" name="user_name" onChange={this.handleInputChange} />
//                         </div>

//                         {/*<div class="form-group">*/}
//                             {/*<input class="form-control"  type="text"  id="user_email" ref="user_email" name="user_email" onChange={this.handleInputChange} />*/}
//                             <EmailInputTextCustom   id="user_email" ref="user_email" name="user_email" valor={this.state.user_email} msgErro="Invalid email" change={this.changeMail} foi_submetido={this.state.showError}/>
//                         {/*</div>*/}
                        
//                         <button class="btn btn-primary" onClick={this.create} >Confirm</button>                                            
//                 </div>
//             </div>
// 		);	
//     }

//     renderResultAvaliation(){        
//         return (
//             <div>
//                 <h3 id="msgConfirmation" class="alert alert-success text-center">Thank you for voting!</h3>
//             </div>
//         )
//     }

// 	render(){        
//         if(!this.state.avaliated){
//             return this.renderAvaliationPanel();
//         }else{
//             return this.renderResultAvaliation();
//         }        
// 	}
// }

