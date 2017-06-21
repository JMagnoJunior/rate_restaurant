/**
 * The restaurant controller.
 * Recieve the request to list rates and add rates to restaurants and send a response
 * 
 * @author Magno Junior <is.magnojr@gmail.com>
 */
// save the code from some injects atacks 
var sanitize = require('mongo-sanitize');

module.exports = function(app) {

    Restaurant = app.models.restaurant;

    var controller = {};

    controller.listRates = function(req, res) {

        var google_id = sanitize(req.params.id);
        Restaurant.listAllRates(google_id)
        .then(
            function(result) {
                res.json(result)
            }
        )
        .catch(
            function(err) {
                console.log(err);
                res.status(500).json(err);
            }
        );
        
    }

    controller.addRate = function(req, res) {

        var google_id = sanitize(req.params.id);
        var newRate = {};
        newRate.stars =  sanitize(req.body.stars);
        newRate.comment =  sanitize(req.body.comment);
        newRate.user_name = sanitize(req.body.user_name);
        newRate.user_email = sanitize(req.body.user_email);
        Restaurant.addRate(google_id, newRate)
       .then(
            function (result) {            
                res.json(result);
            }
        )
        .catch (
            function(err) {
                console.log(err);
                res.status(500).json(err);
            }
        );
    }

    return controller;

}