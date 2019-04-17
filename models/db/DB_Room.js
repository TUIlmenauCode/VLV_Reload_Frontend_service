const db = require("../../dbConnection");


const Room = {
    selectAll__Name_ID:function(callback){
        return db.query("SELECT roomID, name FROM `Room` WHERE 1", callback);
    },

    select__Termins___from_Room:function(roomID, callback){
        return db.query("SELECT Termin.terminID, Termin.start as \"start\", Termin.end as \"end\", `Event`.`title` as \"eventTitle\", EventType.name as \"eventType\" FROM Termin, `Event`, EventType WHERE NOW() BETWEEN Termin.start AND Termin.end AND Termin.room = ? AND Termin.event = `Event`.`eventID` AND EventType.eventTypeID = Event.eventType", [roomID], callback);
    }

}

module.exports = Room