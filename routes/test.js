var express = require('express');
var router = express.Router();
const utility = require("../utility");


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

router.get("/tc", function(req,res,next){
  
  var userData = utility.userData;

  if (req.session.userId){
    userData.userId = req.session.userId ;
    userData.userName = req.session.userName;
    userData.avatar = req.session.avatar;
  }

  var data = {
      url : utility.domain,
      page_title : "erstelle deinen Stundenplan",
      apiErrors : [],
      userData : userData,
    }
  res.render("TimeTable_Customizer", data);

})

module.exports = router;