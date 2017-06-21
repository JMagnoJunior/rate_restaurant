/**
 *  The ClientID and clientSecret came from facebook auth with passport.
 *  I'm not using it on this project anymore, 
 *  but as I didn't erase passport from this project, I still have to inform
 *  In a real enviorment it should be a env var
 */

module.exports = {
    env: 'production',
    db: process.env.MONGO_URL,
    clientID:'1053926518071653',
    clientSecret: '09f415729f634a06f2bbdb7dd1cd591e',
    // seleniumUser:process.env.SELENIUM_USER,
    // seleniumUserPassword:process.env.SELENIUM_USER_PASSWORD
}