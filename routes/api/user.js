var dataHandler = require("../../models/db/DB_Student");
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

router.post('/updateName', function(req, res) {
    
    var name =  req.body.userName;
    var user_ID = Number(req.body.userId);

    if (name != null && name != "" && user_ID != null){
        dataHandler.set_Name__with_ID(user_ID, name, function(err, apiResult){
            if(err){
                console.log(err);
                res.send({
                    status: "error", 
                    error: err
                });
                
            }else{

                res.send({
                    status: "success",
                    data: JSON.stringify(apiResult)
                });
            }
        })
    }

  });


  router.post("/updatePassword", function(req, res){
    var passwordString = req.body.userPassword;
    var confirmPasswordString = req.body.confirmPassword;
    var user_ID = req.body.userId;

    if(user_ID == null || user_ID == 0){
        res.send({status : "error", error : " user id is not set"});
    }else if ( user_password != confirmPasswordString){
        res.send({status: "error", error : "Password does not match"})
    }else{
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(passwordString, salt, function(err, hash) {
                dataHandler.set_Passwordhash__with_ID(user_ID, hash, function(err, apiResult){
                    if(err){
                        res.send({status: "error", error: err});
                    }else{
                        res.send({status: "success"});
                    }
                })
            });
        });
    }
  });

  router.post("/updateAvatar", function(req,res){

    const avatarEncode = req.body.userAvatar;
    const user_ID = req.body.userId;

    if(user_ID != null && user_ID != 0 && avatarEncode != null && avatarEncode != ""){
        dataHandler.set_Avatar__with_ID(avatarEncode, user_ID, function(err, apiResult){
            if(err){
                res.send({status: "error", error : err});
            }else{
                res.send({status: "success"})
            }
        })
    }else{
        res.send({status : "error", error : "userId not send"})
    }
  });

  router.post("/deleteAccount", function(req,res){
      
  });

  router.post("/isCalDavActivated", function(req, res){

    var user_email = req.body.userEmail;
    if (user_email != null && user_email != "ronny.fuchs@tu-ilmenau.de"){
        dataHandler.isDavActive(user_email, function(err, apiResult){
            if (err){
                res.send({status : "error", error : err})
            }else{
               
                if (apiResult[1].length != 0){
                    res.send({status : "success"})
                }else{
                    res.send({status : "error"})
                }
                
                
            }
        })
    }else{
        res.send({ status : "error", error : "user Email not send"})
    }

  });

  router.post("/isPasswordValid", function(req, res){
      console.log(req.body);
    var passwordString = req.body.userPassword;
    var user_ID = req.body.userId;

    if(user_ID != null && user_ID != 0 ){
        dataHandler.get__from_ID(user_ID, function(err, apiResult){
            if (err){
                res.send({status : "error", error : err})
            }else{

                if (apiResult[0] != null){
                    bcrypt.compare(passwordString, apiResult[0].password, function(err, result) {
                            if(err){
                                res.send({status:"error", error: err});
                            }else{
                                if (result) {
                                    res.send({status : "success"})
                                 }else{
                                     res.send({status:"error", error: "wrong Password"});
                                 }
                            }
                            
                        });
                }else{
                    res.send({status : "error", error : "userData not found"})
                }
                
            }
        })
    }else{
        res.send({status : "error", error : "userId not send"})
    }

    
  });

  module.exports = router;