import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect, should} from 'chai';
import sinon from 'sinon';


import Exemplo from "./Exemplo"


describe('<Exemplo />', function () { 

	const [nome, nome2] = ["teste",  "teste 2"];
	const [telefone, telefone2] = ["123456", "78910"];
	const clientes  = [{"nome": nome , "telefone": telefone }, {"nome": nome2 , "telefone": telefone2 }  ] ;	

	it('deve listar todos os cliente', function () {
		// const validacao = sinon.spy()
	
		const wrapper = shallow(<Exemplo />);
		wrapper.setState({"clientes": clientes});
		expect(wrapper.find('ExemploDetalheCliente')).to.have.length(2);
		
	});

	it('deve exibir opcao de cadastro quando clicar em cadastro', function () {
	
		const wrapper = shallow(<Exemplo />);
		wrapper.setState({"cadastrando": true});
		wrapper.setState({"clientes": clientes});
		expect(wrapper.find('#cadastrar')).to.have.length(1);
		
	});

	it('deve cadastrar um cliente quando clica em cadastrar', function () {

		var cadastra = sinon.stub(Exemplo.prototype, 'cadastra');
		
		const wrapper = shallow(<Exemplo />);
		wrapper.setState({"cadastrando": true});
		wrapper.setState({"clientes": clientes});

		wrapper.setState({"nome": "teste"});
		wrapper.setState({"telefone": "9999"});

		wrapper.find('button').simulate('click');
		expect(cadastra.calledOnce).to.equal(true);

	});

 
});