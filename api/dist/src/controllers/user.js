var sanitize = require('mongo-sanitize') 

module.exports = function(app) {

    
    var controller = {}

    controller.getUser = function(req, res){
        
       if(req.session.passport){
           res.status(200).json({success: true})
       }else{
           res.status(401).json({success: false})
       }        
    }

    return controller;
}