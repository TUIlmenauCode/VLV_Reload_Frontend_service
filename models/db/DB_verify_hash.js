const db = require("../../dbConnection");


const Verify_hash = {
    insert:function(user, hash, callback){
        return db.query("INSERT INTO `verify_hash` (`verify_hashId`, `hash`, `user`, `created`, `updated`, `used`) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '0')", [hash, user], callback);
    },

    isActive:function(hash, callback){

    },

    devalue:function(hash, user){
        
    }

}

module.exports = Verify_hash;