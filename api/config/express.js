/**
 * 
 * Express config
 * 
 * @author Magno Junior <is.magnojr@gmail.com>
 */

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');
var auth = require('basic-auth');

module.exports = function() {

    var app = express();    
    app.set("port", 3000)

    // many browsers doesnt supports DELEHTE e PUT, then 
    // this thing turns request to POST and the content-type-method-override 
    // indicates the method which will be called
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(express.static('../public'))

    // CORS
    app.use(function (req, res, next) {

        // For sake of simplicity, everybody is allowed to access
        res.setHeader('Access-Control-Allow-Origin', '*');         
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, api_key, Accept, Authorization");
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // when the request is that flight
        if ('OPTIONS' == req.method) {
            res.send(200);       
        }
        // Pass to next layer of middleware
        next();
    });

    app.use(function (req, res, next) {
       var credentials = auth(req)
        // The right way to do this is to have differents credentials for every front end.
        // With this could be possible to log every request. But it should be used only for reusable components 
        if (!credentials || credentials.name !== 'raterestaurant' || credentials.pass !== '123456') {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="example"');
            res.end('Access denied');
        } else {
           next();
        }
    });

    // sessions
    app.use(cookieParser());
    app.use(session(
        { secret: 'atrocidade estrelar',
          resave: true,
          saveUninitialized: true
    } ));

    // passaport para oauth 2.0 (I could remove this, but I decide to keep it just to show as example)
    app.use(passport.initialize());
    // this session have to be placed before the session express
    app.use(passport.session());

    // A bunch of code for secure
    app.use(helmet.frameguard({ action: 'allow-from', domain: 'https://localhost:8080' }));
    // fake another plataform
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    // avoid cross-site scripting
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());

    // just for swagger
    app.use(express.static('./public'));
 
    app.set('view engine', 'ejs');
    app.set('views','./src/views');

    // I have to change this for consign.
    load('models', {cwd: 'src'})
      .then('controllers')
      .then('routes')
      .into(app);

    // error
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};