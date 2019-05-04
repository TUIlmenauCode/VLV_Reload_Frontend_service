var dataHandler = require("../../models/db/DB_Student");
var express = require('express');
var router = express.Router();

router.post('/setName', function(req, res) {
    
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

  module.exports = router;