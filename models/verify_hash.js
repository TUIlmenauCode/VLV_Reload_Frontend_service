const uuidv1 = require('uuid/v1');
const  db_verify_hash = require('../models/db/DB_verify_hash');
const DB_Student = require('./db/DB_Student');
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

    }, 

    check:function(hash, user, callback){
        var errorList = [];
        db_verify_hash.getHash(hash, user, function(err, apiResult){
            if (err){
                console.log(err)
            }else{
                db_verify_hash.do_inActive(hash);

                var current = apiResult[0];


                if (current.used){
                    errorList.push("Der Code wurde schon verwendet");
                    callback( errorList)
                }else if (user != current.user){
                    errorList.push("Dem Beutzer gehört nicht der Hash");
                    callback( errorList)
                }else{
                    DB_Student.do_confirmed(user)
                    callback( errorList)
                }
            }
        })
    }
}

module.exports = uuid;