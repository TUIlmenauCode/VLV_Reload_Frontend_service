var express = require('express');
var router = express.Router();
const utility = require("../../utility");
const userModule = require("../../models/user/user")
const verify_hashModule = require("../../models/verify_hash")


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

router.get("/send-verify", function(req, res, next){
    var data = {
            url : utility.domain,
            apiErrors : []
          }
        
    res.render("user/send-verify", data)  ;
});


router.get("/verifiy", function(req, res, next){

    const hash = req.query.code;
    const u = req.query.u;
    
    verify_hashModule.check(hash, u, function(check_errors){
        console.log(check_errors)
        if (check_errors.length == 0){
            var data = {
                url : utility.domain,
                apiErrors : []
              }
            res.render("user/login", data)
        }else{
            var data = {
                url : utility.domain,
                apiErrors : check_errors
              }

            var errorstring = "<h3>Error Log: </h3>";
            check_errors.forEach(function(e){
                errorstring = errorstring + "<br>  - " + e;
            })

            res.send("<h1>Dein Code ist ungültig! </h1> Bitte schreibe dein Problem an kai.gothe@tu-ilmenau.de <hr>" + errorstring);
        }
    });
          
});









/**
 *
 *  POST ROUTES
 * 
 */



router.post("/exist_UserName", function(req,res,next){
    var inputName = req.body.UserName;
    if (inputName){
        userModule.existUserName(inputName, function(err, apiResult){
            if (err){
                res.status(500).send("DB Error")
            }else{
                res.send(JSON.stringify(apiResult));
            }
        })
    }else{
        res.status(400).send("not enough was data sent");
    }
    

})

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
            res.render("user/send-verify", data)  ;
        }
    })
});



router.post("/login", function(req, res, next){

    const current_user = req.body.user_name;
    const current_password = req.body.password;
    const saveLogin = req.body.saveLoginInCache;

    userModule.login(current_user, current_password, saveLogin, function(errorList, resObj){
        if (errorList.length > 0 ){
            var data = {
                url : utility.domain,
                apiErrors : errorList
            }
            //res.render("user/login", data);
        }else{
            console.log("Lets log in!");
            console.log(resObj);
            // req.session.userID = resObj.userID;
            // req.session.userName = resObj.userName;
            // req.session.userEmail = resObj.userEmail;
            console.log("Weiter geht es");
            //res.send("hello");
            res.end();
        }
    })
})
 



module.exports = router;