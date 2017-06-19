var swaggerJSDoc = require('swagger-jsdoc');

var options = {
  swaggerDefinition: {
    info: {
      title: 'Rate Restaurant', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  apis: ['./src/routes/restaurant.js'], // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);

exports.swaggerSpec = swaggerSpec;