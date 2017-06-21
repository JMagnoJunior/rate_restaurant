/**
 * 
 * Mongo DB configuration
 * 
 * @author Magno Junior <is.magnojr@gmail.com>
 */

var mongoose = require('mongoose');

module.exports = function(uri) {

    // we don't want see query log for tests and production
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
        mongoose.set('debug',false);
    } else {
        mongoose.set('debug',true);
    }

    mongoose.connect(uri,{ server: { poolSize: 15 }});

    mongoose.connection.on('connected', function() {
      console.log('Mongoose! connected ' + uri);
    });

    mongoose.connection.on('disconnected', function() {
      console.log('Mongoose! connected ' + uri);
    });

    mongoose.connection.on('error', function(erro) {
      console.log('Mongoose! connection error: ' + erro);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose! desconnected');
            process.exit(0);
        });
    });
}