var mongoose = require('mongoose');


module.exports = function() {


    var Rate = mongoose.Schema({
        user_name: {type: String},
        user_email: {type: String, required: [true, "Enter your email"]},
        comment: {type: String},
        stars: {
                type: Number, 
                required: [true, "It can't be so gross! Give it at least one star"], 
                min: [1, "please, give it at only one star!"] , 
                max: [5 , "I know it's good, but you can give only 5 stars" ] 
               },
    })

    var schema = mongoose.Schema({
        google_id: {type: String , required: true},
        rates: [Rate]
    })


    schema.statics.listAllRates = function(google_id){
        return this.model('Restaurant').findOne({'google_id':google_id}).populate('rates').exec()
        .then(function(result){
            if(!result){
                throw "This Resturant has 0 avaliation"
            }
            return Promise.resolve(result)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
    }

    schema.statics.addRate = function(google_id, newRate){
        
        return Restaurant.findOne({"google_id": google_id}).exec()
        .then(
            function(restaurant){
                if(restaurant){
                    restaurant.rates.push(newRate)
                }else{
                    restaurant = new Restaurant()
                    restaurant.google_id = google_id
                    restaurant.rates = newRate
                }
                return restaurant.save()
                
        })
    }

    


    return mongoose.model('Restaurant', schema)
}