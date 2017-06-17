import React from "react"

export default class ExemploDetalheCliente extends React.Component{
	constructor(){
		super();
		this.state = {};
	}

	render(){
		return(
			<div>			
			    <label>Nome:</label>   {this.props.cliente.nome} <br />
			    <label>Telefone:</label>  {this.props.cliente.telefone}
			</div>
		)
	}
}

ExemploDetalheCliente.propTypes = {
	cliente: React.PropTypes.object.isRequired,
}