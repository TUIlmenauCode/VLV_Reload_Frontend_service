var utilities = {

     domain : "https://app.vlv-reload.de",

     userData : {
          userId : 0 ,
          userName : "Ronny Fuchs" ,
          userEmail : "ronny.fuchs@tu-ilmenau.de",
          userAvatar : "https://app.vlv-reload.de/files/assets/images/default-avatar.jpg"
     },

     data : {
          page_title : "Website Title",
          apiErrors : []
      },

}


utilities.data.url = utilities.domain;
utilities.data.userData = utilities.userData;

module.exports = utilities;