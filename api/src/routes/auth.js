// /**
//  * This is used by passport.
//  *  passaport was put here just to show how it works 
//  * 
//  * @author Magno Junior <is.magnojr@gmail.com>
//  */
// var passport = require('passport');
// module.exports = function(app) {
//     app.get('/auth/facebook', passport.authenticate('facebook'));
//     app.get('/auth/facebook/callback',
//             passport.authenticate('facebook', 
// 						{ successRedirect: 'http://localhost:8080/#/',
//                           failureRedirect: '/auth/facebook' }
//             	));
//     app.get('/logout', function(req, res) {
//       req.logOut();
//       res.redirect('/');
//     });

// }