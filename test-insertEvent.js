const ics = require('ics')
const uuidv1 = require('uuid/v1');
var md5 = require('md5');

var db = require('./dbConnection');


var calendarObjects = {
    calendardata : "",
    uri : "",
    calendarid : "",
    lastmodified  : "",
    etag : "",
    size : "",
    componenttype : "",
    fistoccurence : "",
    lastoccurence : "",
    uid : ""
}

 
const event = {
  start: [2019, 04, 25, 22, 30],
  duration: { hours: 1, minutes: 30 },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
  status: 'CONFIRMED',
  organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
    { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
  ]
}
 
ics.createEvent(event, (error, value) => {
  if (error) {
    console.log(error)
    return
  }

  let current_uuid = uuidv1();
  let date_in_secons = (new Date().getTime() / 1000).toFixed(0);

  calendarObjects.calendardata = value;
  calendarObjects.calendarid = 3;
  calendarObjects.uri = current_uuid + ".ics";
  calendarObjects.lastmodified = date_in_secons;
  calendarObjects.etag = md5(calendarObjects.calendardata);
  calendarObjects.componenttype = "VEVENT";
  calendarObjects.fistoccurence = date_in_secons;
  calendarObjects.lastoccurence = date_in_secons;
  calendarObjects.uid = current_uuid;
  calendarObjects.size = Buffer.byteLength(calendarObjects.calendardata);


  console.log(calendarObjects);  


  db.query(" USE sabreDav; INSERT INTO `calendarobjects` ( `calendardata`, `uri`, `calendarid`, `lastmodified`, `etag`, `size`, `componenttype`, `firstoccurence`, `lastoccurence`, `uid`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ", 
  [calendarObjects.calendardata, calendarObjects.uri, calendarObjects.calendarid, calendarObjects.lastmodified, calendarObjects.etag, calendarObjects.size, calendarObjects.componenttype, calendarObjects.fistoccurence, calendarObjects.lastoccurence, calendarObjects.uid], function(err, apiResult){
    if(err){
        console.log(err);
    }else{
        console.log(apiResult);
    }



  })

})
