var express = require('express');
var router = express.Router();
const utility = require("../../utility");


router.get("/login", function(req, res, next){
    var data = {
            url : utility.domain
          }
        
    res.render("user/login", data)  ;
})

router.get("/create", function(req, res, next){
    var data = {
            url : utility.domain
          }
        
    res.render("user/create", data)  ;
})
module.exports = router;