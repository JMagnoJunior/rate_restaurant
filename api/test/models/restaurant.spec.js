var chai = require('chai');
var expect = chai.expect;
var should = require('chai').should;
var sinon = require('sinon');
var mongoose = require('mongoose')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect();
var should = chai.should();
var test_param = require('../test_params')

var Restaurant = test_param.restaurant
var mongoose = test_param.mongoose

describe('model.restaurant', function () {

    var google_id = "0f9a4054a9948cbdddb563c4c9b18d00dfa7bac6";
     
    describe('Restaurant.listAllRates', function listAllRates() {
        before (function(done) {
            Restaurant.create({"google_id":google_id,
                               "rates": [{"user_name": "Test User", 
                                          "user_email": "mail@test.com", 
                                          "comment":  "test comment",
                                          "stars":  5},{"user_name": "Test User 2", 
                                          "user_email": "mail@test.com", 
                                          "comment":  "test comment 2",
                                          "stars":  5}]})
            .then(function(result) {
                done();
            });

        })

        after (function(done) {
            mongoose.connection.db.dropDatabase(done);
        })

        it ('should list all rates for the restaurant',function() {
            return Restaurant.listAllRates(google_id).then(function(result) {
                result.rates.length.should.equal(2);
            })
        });

        it('should throw error when restaurant is not find', function() {
            var message  = "This Resturant has 0 avaliation";
            return Restaurant.listAllRates("000").should.be.rejectedWith(message);
        });
    })

    describe ('Restaurant.addRate', function addRate() {
        before(function(done) {
        Restaurant.create({"google_id":google_id,
                           "rates": [{"user_name": "Test User", 
                                        "user_email": "mail@test.com", 
                                        "comment":  "test comment",
                                        "stars":  5},{"user_name": "Test User 2", 
                                        "user_email": "mail@test.com", 
                                        "comment":  "test comment 2",
                                        "stars":  5}]})
            .then(function(result) {                
                done();
            })
        })

        after (function(done) {
            mongoose.connection.db.dropDatabase(done);
        })

        it ('should add rate for the restaurant',function() {
            var newRate = {};
            newRate = {"user_name": "Test User", 
                                    "user_email": "newratemail@test.com", 
                                    "comment":  "new rate comment",
                                    "stars":  5};

            return Restaurant.addRate(google_id,newRate).then(function(){
                return Restaurant.listAllRates(google_id).then(function(result){
                    result.rates.length.should.equal(3);
                });
            });
        });
        it ('should throw error when the stars is >5', function() {
            var invalidRate = {"user_name": "Test User", 
                               "user_email": "newratemail@test.com", 
                               "comment":  "new rate comment",
                               "stars":  6};

            return Restaurant.addRate(google_id,invalidRate).should.eventually.be.rejected;

        });
        it ('should throw error when the stars is <1',function() {
            var invalidRate = {"user_name": "Test User", 
                                          "user_email": "newratemail@test.com", 
                                          "comment":  "new rate comment",
                                          "stars":  0};
            return Restaurant.addRate(google_id,invalidRate).should.eventually.be.rejected;
        });

        it('should throw error when the star is not informed', function(){
            var invalidRate = {"user_name": "Test User", 
                               "user_email": "newratemail@test.com", 
                               "comment":  "new rate comment",
                               "stars":  0}

            return Restaurant.addRate(google_id,invalidRate).should.eventually.be.rejected;
        });

        it('should throw error when mails is not informed', function(){
            var invalidRate = {"user_name": "Test User", 
                               "user_email": "", 
                               "comment":  "new rate comment",
                               "stars":  5}
            return Restaurant.addRate(google_id,invalidRate).should.eventually.be.rejected;
        });
    })

})