import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect, should} from 'chai';
import sinon from 'sinon';


import ListAvaliations from "./ListAvaliations"


describe('<ListAvaliations />', function () { 

    var rates =  [{
            "stars": "5",
            "comment":  "Great!",
            "user_name": "Test User",
            "user_email": "mail@test.com"},
            {
            "stars": "4",
            "comment":  "Good",
            "user_name": "Test User",
            "user_email": "mail@test.com"},
            {
            "stars": "3",
            "comment":  "Nah",
            "user_name": "Test User",
            "user_email": "mail@test.com"}]
    it('should list all avaliations', function () {

        const wrapper = shallow(<ListAvaliations />);
        wrapper.setState({"rates": rates});
                
        expect(wrapper.find('Avaliation')).to.have.length(3);
    });

    it('should filter comments by stars', function () {
        const wrapper = shallow(<ListAvaliations />);
        wrapper.setState({"rates": rates});
        // there is 1 avaliation with 5 stars
        wrapper.setState({"filterComments": "5"});
        expect(wrapper.find('Avaliation')).to.have.length(1);
        // theres is avaliation with 1 stars
        wrapper.setState({"filterComments": "1"});
        expect(wrapper.find('Avaliation')).to.have.length(0);

    })
  
     it('should show only comments fullfilled', function () {
        const wrapper = shallow(<ListAvaliations />);
        rates.push[{
            "stars": "2",
            "comment":  " ",
            "user_name": "Test User",
            "user_email": "mail@test.com"
        }]
        wrapper.setState({"rates": rates});
        // there is 1 avaliation with 5 stars
        wrapper.setState({"filterComments": "2"});
        expect(wrapper.find('Avaliation')).to.have.length(0);

    })

 
});