const db = require("../../dbConnection");

const AcademicDegree = {

    get_Name_ID:function(callback){
        return db.query("SELECT `academicDegreeID`, `name`, `shortName` FROM `AcademicDegree` WHERE 1", callback);
    }

}


module.exports = AcademicDegree;