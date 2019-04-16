const db = require("../../dbConnection");


const Room = {
    selectAll__Name_ID:function(callback){
        return db.query("SELECT roomID, name FROM `Room` WHERE 1");
    }
}

module.exports = Room