const dataHandler = require("../../models/db/DB_Room");
var express = require('express');
var router = express.Router();


router.post("/get_Name_Id", function(req, res , next){
    
    dataHandler.selectAll__Name_ID(function(err, apiResult){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(JSON.stringify(apiResult));
        }
    })
})

module.exports = router;