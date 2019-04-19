const db = require("../../dbConnection");


const Verify_hash = {
    insert:function(user, hash, callback){
        return db.query("INSERT INTO `verify_hash` (`verify_hashId`, `hash`, `user`, `created`, `updated`, `used`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '0')", [hash, user], callback);
    },

    getHash:function(hash, user, callback){
        return db.query("SELECT `hash`, `user`, `created`, `updated`, `used` FROM `verify_hash` WHERE verify_hash.hash = ? AND verify_hash.user = ?", [hash, user], callback)
    },

    do_inActive:function(hash, callback){
        return db.query("UPDATE `verify_hash` SET `used`= 1  WHERE verify_hash.hash = ?", [hash], callback)
    }

}

module.exports = Verify_hash;