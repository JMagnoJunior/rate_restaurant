var express = require('express')
var load = require('express-load');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

var auth = require('basic-auth')



module.exports = function() {

    var app = express();
    
    app.set("port", 3000)

    // Nem todos os navegadores/servidores suportam os metodos DELEHTE e PUT, entao 
    // esse trecho transforma as request em POST e usamos o content-type-method-override 
    // para indicar qual o método deve ser chamado.
    // O middleware bodyparser cuida disso para nós.
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(express.static('../public'))


    // ISSO É PARA O CORS
    app.use(function (req, res, next) {

        // For sake of simplicity, everybody is allowed to access
        res.setHeader('Access-Control-Allow-Origin', '*');         

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, api_key, Accept, Authorization");

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware

        if ('OPTIONS' == req.method) {
            res.send(200);       
        }    

        next();
    });

    app.use(function (req, res, next) {
       var credentials = auth(req)
        // The right way to do this is to have differents credentials for every front end.
        // With this could be possible to log every request. But it should be used only for reusable components 
        if (!credentials || credentials.name !== 'raterestaurant' || credentials.pass !== '123456') {
            res.statusCode = 401
            res.setHeader('WWW-Authenticate', 'Basic realm="example"')
            res.end('Access denied')
        } else {
           next()            
        }
    });


    

    // para o express  trabalhar com sessoes
    app.use(cookieParser());
    app.use(session(
        { secret: 'atrocidade estrelar',
          resave: true,
          saveUninitialized: true
    } ));

    // passaport para oauth 2.0
    app.use(passport.initialize());
    // a sessao do passaport deve vir antes da sessao do express!
    app.use(passport.session());

    // isso aqui é um monte de coisa pra enganar os raquis
    // app.use(helmet.frameguard());
    app.use(helmet.frameguard({ action: 'allow-from', domain: 'https://localhost:8080' }))
    // finge ser outra plataforma
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    // evitar cross-site scripting
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());

    app.use(express.static('./public'));
 

    //## O FRONT  SERA EM REACT. A view é utilizada para erro e login
    app.set('view engine', 'ejs');
    app.set('views','./src/views');


    // isso é um facilitador para o uso dos controllers, models routers.
    // escrevendo essa linha posso referenciar os models no route e no controller sem a necessidade de importar cada modulo individualmente.
    // o mesmo ocorrer para o uso dos controllers no router.
    load('models', {cwd: 'src'})
      .then('controllers')
      .then('routes')
      .into(app);

    // a ultima rota chamada. se nenhuma rota bater com a url informada, 
    // essa rota será executado:
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};