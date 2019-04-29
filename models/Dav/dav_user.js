const sabre_db = require("../../sabre_dbConnection")
const md5 = require('md5');



const User = {

    create:function(user_name, user_email, user_password, callback){

        
        let digesta = md5(user_name + ":BaikalDAV:" + user_password);
        let principalURI = "principals/" + user_email;

        return sabre_db.query(`

        SET @user_name = ?;
        SET @user_email = ?;
        SET @user_digesta = ?;
        SET @principalURL = ?;
        SET @url = 0x64656661756c74;
        
        
        INSERT INTO users ( username, digesta1) VALUES (CONVERT(@user_email, BINARY), CONVERT(@user_digesta, BINARY));

        INSERT INTO calendars ( synctoken, components) VALUES ( 1, 0x564556454e542c56544f444f);

        SET @calendarID = LAST_INSERT_ID();

        INSERT INTO principals (uri, email, displayname) VALUES ( CONVERT(@principalURL, BINARY), CONVERT(@user_email, BINARY), @user_name);

        INSERT INTO addressbooks ( principaluri, displayname, uri, description, synctoken) VALUES ( CONVERT(@principalURL , BINARY), 'VLV - Reload Adressbuch', @url, 'VLV - Reload Adressbuch', 1);

        INSERT INTO calendarinstances ( calendarid, principaluri, access, displayname, uri, description, calendarorder, calendarcolor, timezone, transparent, share_href, share_displayname, share_invitestatus) VALUES (@calendarID , CONVERT(@principalURL , BINARY), 1, 'VLV Reload Stundenplan', 0x64656661756c74, 'Dein persönlicher Studenplan von VLV-Reload.de ', 0, '', '', 0, NULL, NULL, 2);
        
        `, 
        [user_name, user_email, digesta, principalURI], 
        callback);
    },

    update_password:function(user_name, newPassword, callback){
        let digesta = md5(user_name + ":BaikalDAV:" + newPassword);
        return sabre_db.query("UPDATE `users` SET  `digesta1` = ? WHERE username = ?", [digesta, user_name], callback);
    },

    update_passwordHASH:function(user_name, passwordHash, callback){
        return sabre_db.query("UPDATE `users` SET  `digesta1` = ? WHERE username = ?", [passwordHash, user_name], callback);
    },

    update_name:function(user_name, user_email, callback){
        return sabre_db.query( 'UPDATE `principals` SET `displayname`= ? WHERE `email` = ?', [user_name, user_email], callback);
    }, 

    exist(email, callback){
        return sabre_db.query("SELECT (CASE WHEN COUNT(principals.id)> 0 then 1 else 0 end) as didExist FROM principals WHERE principals.email  = ?", [email], callback);
    },

    getHash:function(user_name, callback){
        return sabre_db.query("SELECT `digesta1` FROM `users` WHERE `username` = ?",[user_name], callback)
    },



}

module.exports = User