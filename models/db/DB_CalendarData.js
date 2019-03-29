



const db = require("../../dbConnection");

const CalendarData = {

    get_Name_ID:function(courseID, date,  callback){
        return db.query("SELECT Termin.start, Termin.end, Room.name, `Event`.`title` FROM GroupTermins, SeminarGroup, Termin, Room, `Event` WHERE SeminarGroup.seminarGroupID = ? AND GroupTermins.group = SeminarGroup.seminarGroupID AND Termin.terminID = GroupTermins.termin AND Room.roomID = Termin.room AND `Event`.`eventID` = Termin.event AND date(Termin.start) = ?", 
        [courseID, date],
        callback);
    }

}


module.exports = CalendarData;