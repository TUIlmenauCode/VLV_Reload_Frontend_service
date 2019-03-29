var express = require('express');
var router = express.Router();
const utility = require("../../utility");
const userModule = require("../../models/user/user")


router.get("/login", function(req, res, next){
    var data = {
            url : utility.domain
          }
        
    res.render("user/login", data)  ;
});

router.get("/create", function(req, res, next){
    var data = {
            url : utility.domain,
            apiErrors : []
          }
        
    res.render("user/create", data)  ;
});

router.post("/create", function(req, res, next){
    console.log(req.body);
    var user_name = req.body.name;
    var user_password = req.body.user_password;
    var user_password_confirm = req.body.user_password_confirm;
    var user_email = req.body.user_email;

    userModule.create(user_name, user_email, user_password, user_password_confirm, function(err, result){
        if (err){
            console.log(err);
            var data = {
                url : utility.domain,
                apiErrors : err
            }
            res.render("user/create", data)  ;
        }else{
            console.log(result);
            var data = {
                url : utility.domain,
                apiErrors : []
            }
            res.render("user/login", data)  ;
        }
    })
});


module.exports = router;