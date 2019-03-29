



const db = require("../../dbConnection");

const CalendarData = {

    get__Termins__from__CoursID_Date:function(courseID, date,  callback){
        return db.query("SELECT DATE_FORMAT(Termin.start, '%Y-%m-%dT%H:%i:%S'), DATE_FORMAT(Termin.end, '%Y-%m-%dT%H:%i:%S'), Room.name AS 'room', `Event`.`title` FROM GroupTermins, SeminarGroup, Termin, Room, `Event` WHERE SeminarGroup.seminarGroupID = ? AND GroupTermins.group = SeminarGroup.seminarGroupID AND Termin.terminID = GroupTermins.termin AND Room.roomID = Termin.room AND `Event`.`eventID` = Termin.event AND date(Termin.start) = ?", 
        [courseID, date],
        callback);
    }

}


module.exports = CalendarData;