var express = require('express');
var router = express.Router();


router.get("/sessionDump", function(req, res, next){
    res.send(req.session);
})

router.get("/userAgent", function(req, res, next){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    res.send(req.headers['user-agent'] +"<br>" + fullUrl+"<br>" + ip);
})

module.exports = router;