#!/usr/bin/env node

/**
 *  just the cluster stater.
 * 
 */

var cluster = require('cluster');
const stopSignals = [
        'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
const production = process.env.NODE_ENV == 'production';
var stopping = false;

if (cluster.isMaster) {

    var cpuCount = require('os').cpus().length;
    console.log('Cpus detectados: '+ cpuCount);
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    if (production) {
        stopSignals.forEach(function(signal) {
            process.on(signal, function() {
                console.log('Recebeu o sinal %s . Stopping workers...', signal);
                stopping = true;
                cluster.disconnect(function() {
                    console.log('All workers stopped, exiting.');
                    process.exit(0);
                });
            });
        });
    }
} else {

    var app = require('./config/express')();
    var debug = require('debug')('node:server');
    var http = require('http');
    var config = require('./config/config')();
    require('./config/passport')();
    require('./config/database.js')(config.db); 
    var auth = require('basic-auth');

    var port = normalizePort(process.env.PORT || process.env.NODE_PORT || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */ 
    server.listen(port, function() {
          console.log('Worker %d runing on %d', cluster.worker.id, port);
    });
    server.on('error', onError);
    server.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {

    var port = parseInt(val, 10);
    if (isNaN(port)) {
      // named pipe
      return val;
    }
    if (port >= 0) {
      // port number
      return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
      console.log('Erro de listening '+error.syscall );
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

cluster.on('exit', function(worker){
    // Replace the dead worker,
    // we're not sentimental
    console.log('Worker %d died in event exit :(', worker.id);
    if (production) {
        if (!stopping) {
            console.log(' stopping: ' + stopping);
            cluster.fork();
        }
    }
});