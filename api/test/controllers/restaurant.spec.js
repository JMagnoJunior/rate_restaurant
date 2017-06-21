/**
 * This is to test the restaurant controller
 * 
 * @author Magno Junior <is.magnojr@gmail.com>
 */
var test_param = require('../test_params')
var Restaurant = test_param.restaurant
var mongoose = test_param.mongoose
var request = test_param.request
var app = test_param.app


describe ('controller.restaurant', function() {

    describe ('restaurant.listRates', function listAllRates() {
        var google_id = "0f9a4054a9948cbdddb563c4c9b18d00dfa7bac6";
        beforeEach(function(done) {
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

        afterEach(function(done) {
            mongoose.connection.db.dropDatabase(done);
        })

        it ('should fail(401) list restaurant if auth is not informed', function() {
            return  request(app).get("/restaurants/"+google_id+'/rates').auth('error', 'error').expect(401);
        })

        it ('should fail(500) if restaurants does not exists', function() {
            invalid_restaurant = '99999';
            return  request(app).get("/restaurants/"+invalid_restaurant+'/rates').auth('raterestaurant', '123456').expect(500);       
        })

        it ('should success(200) if restaurants does exists', function(){            
            return  request(app).get("/restaurants/"+google_id+'/rates').auth('raterestaurant', '123456').expect(200);       
        })
    })

    describe('restaurant.addRates', function listAllRates() {          
        var google_id = "0f9a4054a9948cbdddb563c4c9b18d00dfa7bac6";
        beforeEach(function(done){
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
        });

        afterEach(function(done) {
            mongoose.connection.db.dropDatabase(done);
        });

        it ('should create new restaurant with it doesnt exists', function() {
            new_restaurant = '000000'
            return  request(app).post("/restaurants/"+new_restaurant+'/rates')
                .send({'stars': '5' ,'comment': 'comment test', 'user_name': 'tester', 'user_email': 'newemailtest@mail.br'})
                .auth('raterestaurant', '123456')
                .expect(200);       
        })

          it ('should fail(500) if email is wrong', function() {
            new_restaurant = '000000';
            fail_mail = "error";
            return  request(app).post("/restaurants/"+new_restaurant+'/rates')
                .send({'stars': '5' ,'comment': 'comment test', 'user_name': 'tester', 'user_email': fail_mail})
                .auth('raterestaurant', '123456')
                .expect(500);
        })

        it('should fail(500) if email is blank', function() {
            new_restaurant = '000000';
            fail_mail = "";
            return  request(app).post("/restaurants/"+new_restaurant+'/rates')
                .send({'stars': '5' ,'comment': 'comment test', 'user_name': 'tester', 'user_email': fail_mail})
                .auth('raterestaurant', '123456')
                .expect(500);
        })

         it('should fail(500) if stars = 0', function() {
            new_restaurant = '000000';
            stars = "0";
            return  request(app).post("/restaurants/"+new_restaurant+'/rates')
                .send({'stars': stars ,'comment': 'comment test', 'user_name': 'tester', 'user_email': 'mail@test.com'})
                .auth('raterestaurant', '123456')
                .expect(500);       
        })

        it('should success(200) if comment is blank', function() {
            new_restaurant = '000000';
            return  request(app).post("/restaurants/"+new_restaurant+'/rates')
                .send({'stars': '5' ,'comment': '', 'user_name': 'tester', 'user_email': 'mail@test.com'})
                .auth('raterestaurant', '123456')
                .expect(200);
        })

        it ('should success(200) if user_name is blank', function() {
            new_restaurant = '000000';            
            return  request(app).post("/restaurants/"+new_restaurant+'/rates')
                .send({'stars': '5' ,'comment': '', 'user_name': '', 'user_email': 'mail@test.com'})
                .auth('raterestaurant', '123456')
                .expect(200);       
        })
    })

})