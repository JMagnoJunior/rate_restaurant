import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect, should} from 'chai';
import sinon from 'sinon';


import UserAvaliationControlPanel from "./UserAvaliationControlPanel"


describe('<UserAvaliationControlPanel />', function () { 

	it('should render avaliation panel if it is not avaliated', function () {
	
		const wrapper = shallow(<UserAvaliationControlPanel />);

        wrapper.setState({"avaliated": false});
		
		expect(wrapper.find('#panelAvaliation')).to.have.length(1);
		
	});

    it('should render error avaliation panel if some error occurs after avaliation', function () {

        const wrapper = shallow(<UserAvaliationControlPanel />)
        wrapper.setState({"avaliated": false});
        wrapper.setState({"showError": true});

        expect(wrapper.find('#panelAvaliation')).to.have.length(1);
        expect(wrapper.find('#msgError')).to.have.length(1);

    });

    it('should show confirmation message after avaliation if everything is ok', function(){

        const wrapper = shallow(<UserAvaliationControlPanel />)
        wrapper.setState({"avaliated": true});
        wrapper.setState({"showError": false});

        expect(wrapper.find('#panelAvaliation')).to.have.length(0);
        expect(wrapper.find('#msgConfirmation')).to.have.length(1);

    })

    it('shouldcreate a new avaliation when clicked Confirm', function () {

        var create = sinon.stub(UserAvaliationControlPanel.prototype, 'create');

        const wrapper = shallow(<UserAvaliationControlPanel />)
        wrapper.setState({"avaliated": false});
        wrapper.setState({stars: "5"});
        wrapper.setState({comment: "test comment"})
        wrapper.setState({user_name: "test user"})
        wrapper.setState({user_email: "invalid@mail.com"})
        wrapper.find('button').simulate('click');
		expect(create.calledOnce).to.equal(true);

    });

 
});