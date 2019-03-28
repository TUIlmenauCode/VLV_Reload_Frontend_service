const db = require("../../dbConnection")

const Semester = {

    get_Name_ID:function(course, callback){
        return db.query("SELECT DISTINCT SeminarGroup.semester, Semester.name FROM `SeminarGroup` LEFT JOIN Semester ON (SeminarGroup.semester = Semester.fachSemesterID) WHERE SeminarGroup.course = ?", [course], callback);
    },

    
    get_all_Name_ID:function(callback){
        return db.query("SELECT `fachSemesterID`, `name` FROM `Semester` WHERE 1", callback);
    },

}

module.exports = Semester;