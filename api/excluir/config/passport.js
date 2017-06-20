var config = require('./config')()

var passport = require('passport');
// var GitHubStrategy = require('passport-github2').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');



module.exports = function() {

    //ESSE CODIGO É PARA FAZER LOGIN PELO GITHUB!
    // PARA USAR O GOOGLE OU FACEBOOK PRECISAMOS DE OUTRO Strategy para o passport
    var Usuario = mongoose.model('Usuario');
    passport.use(new FacebookStrategy({
        // clientID: '9eef68a2b807250cc5c9',
        // clientSecret: 'ecea185e2b4874bbaddaa1fdb0b63da847e99be1',
        clientID: config.clientID,
        clientSecret: config.clientSecret,

        callbackURL: 'http://localhost:3000/auth/facebook/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            
            // apos obter o profile do github, vamos consultar no nosso banco se o usuario ja foi cadastrado
            Usuario.findOrCreate(
                { "login" : profile.id},
                { "nome" : profile.id},
                function(erro, usuario) {
                    if(erro) {
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null, usuario);
                }
            );
        }
    ));

    // o metodo abaixo serializa o usuario para jogar na sessao
    // somente o id do usuario, no lugar de jogar todos os dados (poupando memoria)
    //
    passport.serializeUser(function(usuario, done) {
      done(null, usuario._id);
    });

    // esse é o processo inverso do metodo anterior
    //
    passport.deserializeUser(function(id, done) {
      Usuario.findById(id).exec()
      .then(function(usuario) {
          done(null, usuario);
      });
    });
};