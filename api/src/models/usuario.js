// /**
//  * This is used by passport.
//  *  passaport was put here just to show how it works 
//  * 
//  * @author Magno Junior <is.magnojr@gmail.com>
//  */
// var mongoose = require('mongoose')
// var findOrCreate = require('mongoose-findorcreate');

// module.exports = function() {
//     var schema = mongoose.Schema({
//         login: {
//               type: String,
//               required: true,
//               index: {
//                 unique: true
//               }
//         },
//         nome: {
//           type: String,
//           required: true,
//         },
//         inclusao: {
//           type: Date,
//           default: Date.now
//         }
//   });

//   schema.plugin(findOrCreate);

//   return mongoose.model('Usuario', schema);
// };