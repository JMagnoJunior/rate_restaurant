// /**
//  * this is the passaport. It is not used by the rate restaurant application. I am just showing it uses
//  * 
//  * @author Magno Junior <is.magnojr@gmail.com>
//  */

// var config = require('./config')();
// var passport = require('passport');
// FacebookStrategy = require('passport-facebook').Strategy;
// var mongoose = require('mongoose');

// module.exports = function() {

//     var Usuario = mongoose.model('Usuario');
//     passport.use(new FacebookStrategy({
//             clientID: config.clientID,
//             clientSecret: config.clientSecret,
//             callbackURL: 'http://localhost:3000/auth/facebook/callback'
//         },
//         function (accessToken, refreshToken, profile, done) {            
//             Usuario.findOrCreate(
//                 { "login" : profile.id },
//                 { "nome" : profile.id },
//                 function (erro, usuario) {
//                     if (erro) {
//                         console.log(erro);
//                         return done(erro);
//                     }
//                     return done(null, usuario);
//                 }
//             );
//         }
//     ));

//     passport.serializeUser(function (usuario, done) {
//         done(null, usuario._id);
//     });

//     passport.deserializeUser(function (id, done) {
//         Usuario.findById(id).exec()
//         .then(function(usuario) {
//             done(null, usuario);
//         });
//     });

// };