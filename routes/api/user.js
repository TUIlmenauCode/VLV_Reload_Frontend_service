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


  router.post("/updatePassword", function(req,res){
    var passwordString = req.body.userPassword;
    var confirmPasswordString = req.body.confirmPassword;
    var user_ID = req.body.userId;

    if(user_ID == null || user_ID == 0){
        res.send({status : "error", error : " user id is not set"});
    }else if ( user_password !== user_password_confirm){
        errorMessage.push("Du hast zwei unterschiedliche Passworter angegeben")
    }else {

    }
  })

  router.post("/updateAvatar", function(req,res){

  })

  router.post("/deleteAccount", function(req,res){
      
  })

  router.post("/isCalDavActivated", function(req, res){

  })

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

    
  })

  module.exports = router;