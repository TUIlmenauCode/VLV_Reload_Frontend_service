const db = require("../../dbConnection")

const Semester = {

    get_Name_ID:function(callback){
        return db.query("SELECT `fachSemesterID`, `name` FROM `Semester` WHERE 1", callback);
    }

}

module.exports = Semester;