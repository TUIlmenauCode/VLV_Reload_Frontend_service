var dataHandler = require("../../models/db//DB_Semester");
var express = require('express');
var router = express.Router();

router.post('/get_Name_ID', function(req, res) {
    dataHandler.get_Name_ID(function(err, apiResult){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(JSON.stringify(apiResult));
        }
    })
  });

  module.exports = router;