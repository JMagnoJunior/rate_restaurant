import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect, should} from 'chai';
import sinon from 'sinon';


import ExemploDetalheCliente from "./ExemploDetalheCliente"


describe('<ExemploDetalheCliente />', function () { 

	
	const nome = "teste";
	const telefone = "123456";
	const cliente  = {"nome": nome , "telefone": "123456" };

	it('deve exibir um label com o nome e o telefone do cliente', function () {
		// const validacao = sinon.spy()
		
		const wrapper = shallow(<ExemploDetalheCliente cliente={cliente} />);
		expect(wrapper.contains(<label>Nome:</label>)).to.equal(true);
		expect(wrapper.contains(<label>Telefone:</label>)).to.equal(true);
	});

	it('deve exibir os dados informados do cliente', function () {
	

		const wrapper = shallow(<ExemploDetalheCliente cliente={cliente} />);
		expect(wrapper.contains(nome)).to.equal(true);
		expect(wrapper.contains(telefone)).to.equal(true);
	});
 
 
});