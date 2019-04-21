const db = require("../../dbConnection")

const Course = {

    get_Name_ID:function(grade, callback){
        return db.query("SELECT `courseID`,`name` FROM `Course` WHERE `degree` = ? ORDER BY `Course`.`name` ASC", [grade], callback);
    }

}

module.exports = Course;