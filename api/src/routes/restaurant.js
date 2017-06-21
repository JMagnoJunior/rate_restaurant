/**
 * restaurant routes
 * 
 * just a get in /restaurants/:id/rates to list all rate from some restaurant
 * and a post in /restaurants/:id/rates to add rates to some restaurant
 * 
 * @author Magno Junior <is.magnojr@gmail.com>
 */

module.exports = function(app) {
    
    var controller = app.controllers.restaurant;

    /**
     * @swagger
     * /restaurants/{id}/rates:
     *   get:
     *     description: list all rates from the restaurant by google id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Any id used by google maps/places
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: A restaurant with all the rates it recieved
     *         schema:
     *           type: array
     *           items: 
     *             $ref: '#/definitions/rate'
     *       500:
     *         description: Restaurant not avaliated yet
     *           
     *   post:
     *     description: add a new rate to the restaurant id in the url
     *     consume:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Any id used by google maps/places
     *         in: path
     *         required: true
     *         type: string
     *       - name: body
     *         in: body
     *         description: Created rate object
     *         type: string
     *         required: true
     *         schema:
     *           $ref: '#/definitions/rate'
     *     responses:
     *       200:
     *         description: all rates added to the restaurant
     *       500:
     *         description: rate not added to the restaurant
     * definitions: 
     *   rate:
     *     type: object
     *     properties:
     *       user_name:
     *         type: string
     *         description: the name of who evaluated the restaurant.
     *       user_email:
     *         type: string
     *         description: the email of who evaluated the restaurant.
     *         required: true
     *       comment:
     *         type: string
     *         description: the user comment about the restaurant.
     *       stars:
     *         type: integer
     *         description: Customer rating about a restaurant
     *         minimum: 1
     *         maximum: 5
     */
    app.route('/restaurants/:id/rates')
        .get(controller.listRates)
        .post(controller.addRate);

}
