const db = require("../../dbConnection")

const SeminarGroup = {

    get_Name_ID:function(semester, course, callback){
        return db.query("SELECT `seminarGroupID`, `name` FROM `SeminarGroup` WHERE `semester` = ? AND `course` = ?",[semester, course] , callback);
    }

}

module.exports = SeminarGroup;