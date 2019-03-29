const db = require("../../dbConnection");


const obj = {

    write:function(clientIP, userAgent, url, callback){
        return db.query("INSERT INTO `Statistic_Source` (`Statistic_SourceID`, `clientIP`, `url`, `userAgent`, `timestamp`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)",[clientIP,url,userAgent], callback);
    }

}

module.exports = obj;