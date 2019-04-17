const uuidv1 = require('uuid/v1');
const  db_verify_hash = require('../models/db/DB_verify_hash');
const mail = require('./mail');



const uuid = {

    generate:function(userID, user_name, user_email){
        var hash = uuidv1()
        db_verify_hash.insert(userID, hash, function(err, apiResult){
            console.log("##############################################");
            if (err){
                console.log(err);
            }else{
                mail.send(user_name, "https://app.vlv-reload.de/user/verifiy?code=" + hash + "&u=" + userID, user_email);
            }
        })

    }

}

module.exports = uuid;