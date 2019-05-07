const db = require("../../dbConnection");
const bcrypt = require('bcrypt');
const DB_User = require('../db/DB_Student');
const verify_hash = require('../../models/verify_hash');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const User = {

    create:function(user_name, user_email, user_password, user_password_confirm, callback){
        console.log("Start create user ");
        var errorMessage = [];
        var emailPattern =  /@tu-ilmenau.de+/g

        // is set User Name 
        if (typeof user_name == 'undefined' || user_name == null || user_name.trim() === ''){
            errorMessage.push("Du hast vergessen, Dir einen Benutzernamen auszusuchen !")
        }


        // is email valid ? 
        if (!validateEmail(user_email)){
            errorMessage.push("Deine angegebene E-Mail Adresse ist nicht korrekt")
        }

        if (!user_email.match(emailPattern)){
            errorMessage.push("Deine angegebene E-Mail Adresse ist nicht von der TU Ilmenau")
        }

        if ( user_password !== user_password_confirm){
            errorMessage.push("Du hast zwei unterschiedliche Passwörter angegeben")
        }

        console.log(errorMessage);
        if (errorMessage.length > 0) {
            callback(errorMessage, null);
        }else{
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(user_password, salt, function(err, hash) {
                    
                    
                    DB_User.insert(user_name, user_email, hash, "", 0, function(err, apiResult){
                        if (err){
                            callback([err], null);
                        }else{
                            verify_hash.generate(apiResult.insertId, user_name, user_email);
                            callback(null, apiResult.insertId);

                        }
                    })



                });
            });

            // generate Password hash 

        }

    },

    existUserName:function(inputName, callback){
        return db.query("SELECT Student.studentID FROM `Student` WHERE Student.name = ?", [inputName], callback)
    },

    login:function(user, password, saveLogin , callback){

        var errorlist = [];

        if (password.length == 0){
            errorlist.push("Kein Password angegeben")
        }

        if (user.length == 0){
            errorlist.push("Keine Email angegeben")
        }

        if (errorlist.length == 0 ){

            DB_User.get__from_Email(user, function(err, apiResult, not_confirmed){
                if (err){
                    console.log(err);
                    errorlist.push(err);
                }else{
                    //console.log(apiResult);
                    if (apiResult.length > 0){
                        //console.log(apiResult);
                        var user_ID = apiResult[0].studentID
                        var user_Name = apiResult[0].name
                        var user_email = apiResult[0].email
                        var user_passwordHash = apiResult[0].password
                        var user_confirmed = apiResult[0].confirmed
                        var user_avatar = apiResult[0].avatar;

                        if (user_confirmed == 1){
                            bcrypt.compare(password, user_passwordHash, function(b_err, b_result){
                                if (err){
                                    console.log(b_err);
                                }
    
                                if (b_result){
                                    const resObj = {
                                        userId : user_ID, 
                                        userName : user_Name, 
                                        userEmail : user_email,
                                        userAvatar : user_avatar,
                                    }
                                    console.log("Dump result")
                                    console.log(resObj);
                                    callback(errorlist, resObj);
    
                                }else{
                                    console.log("Password does not match");
                                    errorlist.push("Das Passwort stimmt nicht!");
                                    callback(errorlist)
                                }
                            })
                        }else{
                            callback(errorlist, null, 1);
                        }
    
                        
                    }else{
                        errorlist.push("Der Benutzer wurde nicht gefunden");
                        callback(errorlist)
                    }
                }
            })
        }
    },


}



module.exports = User;