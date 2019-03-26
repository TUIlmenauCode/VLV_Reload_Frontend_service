/**
 *      REQUIREMENTS
 */

var express = require('express');
var http = require('http');
var path = require('path');
var debug = require('debug')('rkdemo:server');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var session = require('express-session');
const fileUpload = require('express-fileupload');




// configure app
var app = express();
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('public'));
app.use(session({ secret: 'krunal', resave: false, saveUninitialized: true, }));


// fixed Routes

const user_Route = require("./routes/user/user");



// ROUTES 
app.get('/', function (req, res, next) {
  res.send("Hello World! VLV Frontent ")
});




/**
 *  USER
 */


app.use("/user", user_Route);



/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function () {
    console.log('Example app listening on port: ' + port);
  });
server.on('error', onError);
server.on('listening', onListening);



/**
 * 
 * FUNCTIONS
 * 
 */

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
  
