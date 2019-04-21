const dataHandler = require("../../models/db/DB_Meals");
var express = require('express');
var router = express.Router();

router.post('/getAll', function(req, res) {
    console.log(req.body);
    var mensaId = req.body.mensaId;
    var date = req.body.date;
    dataHandler.getAll__from_mensa_date(mensaId, date, function(err, apiResult){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(JSON.stringify(apiResult));
        }
    })
  });

  router.post('/getNotes', function(req, res) {
    console.log(req.body);
    var mensaId = req.body.mealId;
    dataHandler.getNotes(mensaId, function(err, apiResult){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(JSON.stringify(apiResult));
        }
    })
  });

  module.exports = router;