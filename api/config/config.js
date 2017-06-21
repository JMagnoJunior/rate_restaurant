/**
 * centrilizer all configuration by enviroment (look the env/ files)
 * 
 * @author Magno Jr <is.magnojr@gmail.com>
 */

module.exports = function() {
    if (process.env.NODE_ENV ) {		
        return require('./env/'+ process.env.NODE_ENV + '.js');
    } else {
        return require('./env/development.js');
    }
}