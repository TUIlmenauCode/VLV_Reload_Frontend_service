var express = require('express');
var router = express.Router();
const utility = require("../../utility");


router.get("/", function(req, res, next){
    
  var data = JSON.parse(JSON.stringify(utility.data));

    if (req.session.userId){
      userData.userId = req.session.userId ;
      userData.userName = req.session.userName;
      userData.userAvatar = req.session.userAvatar;
    }
    
    data.page_title = "Übersicht der Mensa"
    res.render("Mensa", data);
})


router.get("/Ehrenberg", function(req, res, next){
  var data = JSON.parse(JSON.stringify(utility.data));

    if (req.session.userId){
      userData.userId = req.session.userId ;
      userData.userName = req.session.userName;
      userData.userAvatar = req.session.userAvatar;
    }
    
    data.page_title = "Mensa Ehrenberg"
res.render("Mensa_Ehrenberg", data);
})




router.get("/Cafeteria_Mensa_Ehrenberg", function(req, res, next){
  var data = JSON.parse(JSON.stringify(utility.data));

    if (req.session.userId){
      userData.userId = req.session.userId ;
      userData.userName = req.session.userName;
      userData.userAvatar = req.session.userAvatar;
    }
    
    data.page_title = "Cafeteria Ehrenberg"

res.render("Mensa_Cafe", data);
})


router.get("/Cafeteria_R%C3%B6ntgenbau", function(req, res, next){
  var data = JSON.parse(JSON.stringify(utility.data));

    if (req.session.userId){
      userData.userId = req.session.userId ;
      userData.userName = req.session.userName;
      userData.userAvatar = req.session.userAvatar;
    }
    
    data.page_title = "Cafeteria Röntgenbau"
res.render("Mensa_R", data);
})


router.get("/NANOteria", function(req, res, next){
  var data = JSON.parse(JSON.stringify(utility.data));

  if (req.session.userId){
    userData.userId = req.session.userId ;
    userData.userName = req.session.userName;
    userData.userAvatar = req.session.userAvatar;
  }
  
  data.page_title = "NANOteria";

res.render("Mensa_Nano", data);
})


module.exports = router;