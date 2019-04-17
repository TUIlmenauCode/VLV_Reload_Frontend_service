const uuidv1 = require('uuid/v1');



const uuid = {


    generate:function(user){

        console.log(uuidv1());

    }

}

module.exports = uuid;