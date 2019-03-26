const db = require("../dbConnection");


var test = {

    start:function(callback){
        return db.query("SELECT * FROM `EventType` WHERE 1", callback)
    }
}

module.exports = test;