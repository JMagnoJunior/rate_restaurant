import React from "react"


export default class InputTextCustom extends React.Component{
	constructor(){
		super();
		this.state = {
			valid : false,
            text: ""
		}

		this.change = this.change.bind(this);
	}


	change(e){

        this.setState({text:e.target.value})

		var { campo } = this.refs;

		if ( !this.props.valida(campo.value) ){
			this.setState({valid : false})
		}else{
			this.setState({valid : true})
		}
	}

    componentWillReceiveProps(nextProps){
      if(this.props.valor != nextProps.valor){  

        this.setState({text: nextProps.valor})

        if ( !this.props.valida(nextProps.valor) ){
			this.setState({valid : false})
		}else{
			this.setState({valid : true})
		}
      }
        
    }
    

	renderValid(label){
		return(
			<div class="form-group">
				{ label }
				<input class="form-control"  onChange={this.change} ref="campo" value={this.state.text} />
			</div>
		);
	}

	renderInvalid(label){
		return(
			<div class="form-group has-error">
				{ label }
				<input class="form-control"  onChange={this.change} ref="campo" value={this.state.text} />
				<span class="error_msg">{this.props.msgErro}</span>
			</div>
		);
	} 

	render() {
	
		var label = <label>{this.props.campo}</label>
		if(this.props.required){
			label = <label>{this.props.campo}*</label>
		}

		if(!this.props.foi_submetido){
			return this.renderValid(label);
		}

		if(this.state.valid){
			return this.renderValid(label);
		}else{
			return this.renderInvalid(label);			
		}

	}
}