const dataHandler = require("../../models/db/DB_CalendarData");
const express = require("express");
var router = express.Router();
var moment = require('moment');

router.post("/TerminsForGroup", function(req, res, next){
    console.log("Search for Termin in Group")
    var course =  req.body.Course;
    var date = req.body.Request_Date;

    if (course && date){
        dataHandler.get__Termins__from__CoursID_Date(course, date, function(err, apiResult){
            if(err){
                res.status(500).send(err)
            }else{
                res.send(JSON.stringify(apiResult));
            }
        });
    }else{
        res.status(400).send("not enough was data sent")
    }


});

module.exports = router;