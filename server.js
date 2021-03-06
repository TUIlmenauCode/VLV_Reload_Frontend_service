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
const utility = require("./utility");
const DB_Stat_Source = require("./models/db/DB_Statistic_source")

// Const 
const DB_room = require("./models/db/DB_Room");
const test_module = require("./routes/test");
const mensa_module = require("./routes/mensa/mensa");


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
//app.use('/static', express.static(__dirname + './public'));
app.use(express.static('public'));
app.use(session({ secret: 'krunal', resave: false, saveUninitialized: true, }));

app.use(function (req, res, next) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  DB_Stat_Source.write(ip, req.headers['user-agent'], fullUrl, function(err, result){
    
  });
  next();
});

app.use(function(req,res,next){

  console.log(new Date());
  next();
});


// fixed Routes

const user_Route = require("./routes/user/user");

const api_AcademicDegree = require("./routes/api/AcademicDegree");
const api_Course = require("./routes/api/Course");
const api_SeminarGroup = require("./routes/api/Seminargroup");
const api_Semester = require("./routes/api/Semester");
const api_meal = require("./routes/api/Meals")

// ROUTES 
app.get('/', function (req, res, next) {

  var data = JSON.parse(JSON.stringify(utility.data));
  
  if (req.session.userId){
    data.userData.userId = req.session.userId ;
    data.userData.userName = req.session.userName;
    data.userData.userAvatar = req.session.userAvatar;
  }

  console.log(utility.data);
  console.log(data);

  data.page_title = "Willkommen";
  res.render("welcome", data)  ;
});

app.get('/public/view',function(req,res,next){

  var data = JSON.parse(JSON.stringify(utility.data));

  if (req.session.userId){
    data.userData.userId = req.session.userId ;
    data.userData.userName = req.session.userName;
    data.userData.userAvatar = req.session.userAvatar;
  }

  data.page_title = "öffentliche Ansicht";
  res.render("public_start", data)  ;
})

app.get('/public/dashboard',function(req,res,next){

  var data = JSON.parse(JSON.stringify(utility.data));
  if (req.session.userId){
    data.userData.userId = req.session.userId ;
    data.userData.userName = req.session.userName;
    data.userData.userAvatar = req.session.userAvatar;
  }
  
  data.page_title = "aktuelle Raum Übersicht";

  var fetched_roomList = [{ roomId : 0, name : "Dummy"}];
  DB_room.selectAll__Name_ID(function(err, apiResult){
    if(err){
        console.log(err);
    }else{
        fetched_roomList = apiResult;
        data.room_list = fetched_roomList;
        res.render("roomOverview", data)  ;
    }
  })
})


/**
 *   DEPARTURE TIMES 
 */

app.get('/zug/abfahrtzeiten',function(req,res,next){

  var data = JSON.parse(JSON.stringify(utility.data));

  if (req.session.userId){
    userData.userId = req.session.userId ;
    userData.userName = req.session.userName;
    userData.userAvatar = req.session.userAvatar;
  }

  data.page_title = "Abfahrtzeiten Bahnhof Ilmenau";
  res.render("departure_times", data)  ;
  
})




/**
 *  USER
 */

app.use("/user", user_Route);

/** 
 *  TEST
 */

app.use("/test", test_module);

/**
 *   MENSA
 */

 app.use("/mensa", mensa_module);

/**
 *  API 
 */

app.use("/api/AcademicDegree", api_AcademicDegree);
app.use("/api/Course", api_Course);
app.use("/api/Semester", api_Semester);
app.use("/api/SeminarGroup", api_SeminarGroup);
app.use("/api/public/calendar", require("./routes/api/calendar_data"));
app.use("/api/Room", require("./routes/api/room"));
app.use("/api/meal/", api_meal);
app.use("/api/user/", require("./routes/api/user"))



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
  
