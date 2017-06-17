

module.exports = function(app) {
    
    var controller = app.controllers.restaurant;

    app.route('/restaurants/:id/rates')
    .get(controller.listRates)
    .post(controller.addRate);

}
