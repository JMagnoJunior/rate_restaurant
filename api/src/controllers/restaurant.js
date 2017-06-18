var sanitize = require('mongo-sanitize') 

module.exports = function(app) {

    Restaurant = app.models.restaurant;

    var controller = {}

    controller.listRates = function(req, res){
        var google_id = req.params.id;
      
        Restaurant.listAllRates(google_id)
        .then(
            function(result){            
                res.json(result)
            }
        )
        .catch(
            function(err){            
                console.log(err);
                res.status(500).json(err);
            }
        );
        
    }

    controller.addRate = function(req, res){
        var google_id = req.params.id;

        var newRate = {};
        newRate.stars =  req.body.stars;
        newRate.comment =  req.body.comment;
        newRate.user_name = req.body.user_name;
        newRate.user_email = req.body.user_email;
    
        Restaurant.addRate(google_id, newRate)
       .then(
            function(result){            
                res.json(result)
            }
        )
        .catch(
            function(err){            
                console.log(err);
                res.status(500).json(err);
            }
        );
      
    }

    return controller;
}