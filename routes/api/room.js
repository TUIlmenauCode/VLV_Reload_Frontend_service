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

router.post("/get_current_Termins", function(req, res , next){

    var roomID = req.body.roomID;

    if (roomID != null) {
        dataHandler.selectAll__Name_ID(roomID, function(err, apiResult){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(JSON.stringify(apiResult));
            }
        })
    }else{
        res.send("Not enought data")
    }
})

module.exports = router;