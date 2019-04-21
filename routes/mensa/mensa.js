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


router.get("/Ehrenberg", function(req, res, next){
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
    page_title : "Mensa Ehrenberg",
    userData : userData
}
res.render("Mensa_Ehrenberg", data);
})




router.get("/Cafeteria_Mensa_Ehrenberg", function(req, res, next){
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
    page_title : "Cafeteria Mensa Ehrenberg",
    userData : userData
}
res.render("Mensa_Cafe", data);
})


router.get("/Cafeteria_R%C3%B6ntgenbau", function(req, res, next){
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
    page_title : "Cafeteria Röntgenbau",
    userData : userData
}
res.render("Mensa_R", data);
})


router.get("/NANOteria", function(req, res, next){
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
    page_title : "NANOteria",
    userData : userData
}
res.render("Mensa_Nano", data);
})


module.exports = router;