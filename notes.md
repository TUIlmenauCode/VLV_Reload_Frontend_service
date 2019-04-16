
# Dashboard 
## Room future view
```SQL 
SELECT Room.roomID, Room.name, Termin.*
FROM Room, Termin
WHERE CURRENT_TIMESTAMP() BETWEEN Termin.start AND Termin.end AND Room.roomID = 1 AND Termin.room = Room.roomID;

SELECT Room.roomID, Room.name, Termin.* FROM Room, Termin WHERE DATE_ADD(NOW(), INTERVAL 2 HOUR) BETWEEN Termin.start AND Termin.end AND Room.roomID = 1 AND Termin.room = Room.roomID
```


# select Room Termin for today
```SQL
SELECT DISTINCT Termin.start, Termin.end, Room.name, `Event`.`title` FROM Termin, Room, `Event` WHERE DATE(Termin.start) = CURRENT_DATE AND Room.roomID = Termin.room AND `Event`.eventID = Termin.event ORDER BY `Termin`.`start` DESC
```