const uuidv1 = require('uuid/v1');
const  db_verify_hash = require('../models/db/DB_verify_hash');
const mail = require('./mail');



const uuid = {

    generate:function(userID, userName){
        var hash = uuidv1()
        db_verify_hash.insert(userID, hash, function(err, apiResult){
            console.log("##############################################");
            if (err){
                console.log(err);
            }else{
                mail.send(userName, "https://app.vlv-reload.de/user/verifiy?code=" + hash + "&u=" + userID);
            }
        })

    }

}

module.exports = uuid;