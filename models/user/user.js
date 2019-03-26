const db = require("../../dbConnection");

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
            errorMessage.push("Du hast zwei unterschiedliche Passworter angegeben")
        }

        console.log(errorMessage);
        if (errorMessage.length > 0) {
            callback(errorMessage, null);
        }else{
            callback(null, 98);
        }

    }

}

module.exports = User;