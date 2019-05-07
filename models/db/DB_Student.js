const db = require("../../dbConnection");


const Student = {

    insert:function(UserName, Email, PasswordHash, avatar, group, callback){
        return db.query("INSERT INTO `Student` (`studentID`, `name`, `email`, `password`, `avatar`, `group`) VALUES (NULL, ?, ?, ?, ?, ?);",[UserName,Email,PasswordHash,avatar,group], callback);
    },

    do_confirmed:function(userId, callback){
        return db.query("UPDATE `Student` SET `confirmed`=1 WHERE `studentID` = ?", [userId], callback);
    }, 

    get__from_Email(user_email, callback){
        return db.query("SELECT `studentID`,`name`,`email`,`password`,`avatar`,`group`, `confirmed` FROM `Student` WHERE Student.email = ?", [user_email], callback);
    },

    get__from_ID(user_ID, callback){
        return db.query("SELECT `studentID`,`name`,`email`,`password`,`avatar`,`group`, `confirmed` FROM `Student` WHERE Student.studentID = ?",[user_ID], callback);
    },

    set_Name__with_ID:function(userId, UserName, callback){
        return db.query("UPDATE `Student` SET `name`= ? WHERE Student.studentID = ?", [UserName, userId], callback);
    },

    set_Passwordhash__with_ID:function(userId, PasswordHash, callback){
        return db.query("UPDATE `Student` SET `password`= ? WHERE Student.studentID = ?", [PasswordHash, userId], callback);
    },

    set_Avatar__with_ID(avatarEncode, user_ID, callback){
        return db.query("UPDATE `Student` SET `avatar`= ? WHERE `studentID` = ?",[avatarEncode, user_ID], callback);
    },

    isDavActive:function(user_email, callback){
        return db.query(`
         USE sabreDav;
         SELECT users.id, principals.id, calendarinstances.id From users, principals, calendarinstances WHERE users.username = ? and principals.email = ? And calendarinstances.principaluri like ?;
         USE VLV_V1;
        `,[user_email, user_email, '%'+ user_email ], callback);
    }


}

module.exports = Student;