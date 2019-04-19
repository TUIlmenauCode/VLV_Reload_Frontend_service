const db = require("../../dbConnection");


const Student = {

    insert:function(UserName, Email, PasswordHash, avatar, group, callback){
        return db.query("INSERT INTO `Student` (`studentID`, `name`, `email`, `password`, `avatar`, `group`) VALUES (NULL, ?, ?, ?, ?, ?);",[UserName,Email,PasswordHash,avatar,group], callback);
    },

    do_confirmed:function(userId, callback){
        return db.query("UPDATE `Student` SET `confirmed`=1 WHERE `studentID` = ?", [userId], callback);
    }

}

module.exports = Student;