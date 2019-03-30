const db = require("../../dbConnection");


const User = {

    insert:function(UserName, Email, PasswordHash, avatar, group, callback){
        return db.query("INSERT INTO `Student` (`studentID`, `name`, `email`, `password`, `avatar`, `group`) VALUES (NULL, ?, ?, ?, ?, ?);",[UserName,Email,PasswordHash,avatar,group], callback);
    }

}

module.exports = User;