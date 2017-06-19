

module.exports = function(app) {
    
    var controller = app.controllers.restaurant;

    /**
     * @swagger
     * /restaurants/:id/rates:
     *   get:
     *     description: list all rates from the restaurant by google id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: google_id
     *         description: Any id used by google maps/places
     *         in: path
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: array
     *         items:{ type: object }
     *     responses:
     *       200:
     *         description: A restaurant with all the rates it recieved
     */
    app.route('/restaurants/:id/rates').get(controller.listRates)
    
    app.route('/restaurants/:id/rates').post(controller.addRate);

}
