var express = require('express');
var router = express.Router();
const utility = require("../../utility");


router.get("/", function(req, res, next){
    var data = {
        url : utility.domain
    }

    res.render("user/logout", data);
    
    res.render("Mensa/Mensa", data);
})

module.exports = router;