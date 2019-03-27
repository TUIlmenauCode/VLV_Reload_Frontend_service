var dataHandler = require("../../models/db/DB_SeminarGroup");
var express = require('express');
var router = express.Router();

router.post('/get_Name_ID', function(req, res) {
    
    var semester =  Number(req.body.Semester);
    var course = Number(req.body.Course);

    dataHandler.get_Name_ID(semester, course, function(err, apiResult){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(JSON.stringify(apiResult));
        }
    })
  });

  module.exports = router;