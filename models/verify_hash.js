const uuidv1 = require('uuid/v1');
const  db_verify_hash = require('../models/db/DB_verify_hash');



const uuid = {
    
    generate:function(user){
        db_verify_hash.insert(user, uuidv1(), function(err, apiResult){
            console.log(err);
            console.log(apiResult);
        })

    }

}

module.exports = uuid;