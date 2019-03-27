const db = require("../../dbConnection")

const Course = {

    get_Name_ID:function(grade, callback){
        return db.query("SELECT `courseID`,`name` FROM `Course` WHERE `degree` = ?", [grade], callback);
    }

}

module.exports = Course;