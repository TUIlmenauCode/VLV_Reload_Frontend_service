var express = require('express');
var router = express.Router();
const utility = require("../../utility");


router.get("/", function(req, res, next){
    
    var userData = {
        userId : 0 ,
        userName : "Ronny Fuchs" ,
        avatar : ""
    }
    
      if (req.session.userId){
        userData.userId = req.session.userId ;
        userData.userName = req.session.userName;
        userData.avatar = req.session.avatar;
      }
    
    var data = {
        url : utility.domain,
        page_title : "Übersicht Mensa",
        userData : userData
    }
    res.render("Mensa", data);
})

module.exports = router;