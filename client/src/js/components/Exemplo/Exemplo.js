import React from "react"

import ExemploDetalheCliente from "./ExemploDetalheCliente"

import ClienteStore from "../../stores/ClienteStore"
import * as ClienteActions from "../../actions/ClienteActions"


export default class Exemplo extends React.Component{
	constructor(){
		super();
		this.state = {
			clientes : [],
			cadastrando : false,
			nome : "",
			telefone : ""
		};

		this.abreCadastro = this.abreCadastro.bind(this)
		this.cadastra = this.cadastra.bind(this)
		this.getClientes = this.getClientes.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this);

		ClienteActions.loadClientes();
	}

	componentWillMount(){
        ClienteStore.on("change",this.getClientes);
    }

    componentWillUnmount(){
        ClienteStore.removeListener("change", this.getClientes);
    }

    handleInputChange(event){
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
    	this.setState({[name] : value});
    }

    getClientes(){

        this.setState({clientes: ClienteStore.getAll()})
    }

    cadastra(){
    	var { nome, telefone } = this.state;	
    	
    	ClienteActions.create({"nome": nome, "telefone": telefone});
    }

    abreCadastro(){
    	this.setState({cadastrando : true})
    }


    renderVisualizando(DetalhesClientes){
		return(
			<div>
				{DetalhesClientes}
				<button onClick={this.abreCadastro} > add cliente </button>
			</div>
		)
    }

    renderCadastrando(DetalhesClientes){
    	return(
			<div>
				{DetalhesClientes}
				
				<hr />
				<div id="cadastrar">
					<label> nome </label><input name="nome"  onChange={this.handleInputChange} /> <br />
					<label> telefone </label> <input name="telefone" type="number"  onChange={this.handleInputChange} /> <br />
					<button onClick={this.cadastra} > cadastra </button>
				</div>
			</div>
		)
    }

	render(){
		
		var DetalhesClientes = null;
		
		if(this.state.clientes){
			DetalhesClientes = this.state.clientes.map((cliente,i) => {
				return <ExemploDetalheCliente key={cliente._id} index={i} cliente={cliente} />
			});
		}

		if(this.state.cadastrando){
			return this.renderCadastrando(DetalhesClientes);
		}else{
			return this.renderVisualizando(DetalhesClientes);
		}
		
	}
}