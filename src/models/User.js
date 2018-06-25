var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
    name : {
        type : String,
        required : true,
    },
    email : {
        unique : true,
        type : String,
        required : true
    },
    id : {
        type : Number,
        unique : true,
        required : true
    },
    picture : {
        type : String,
    },
    panaCloudId : {
        type : String,
    },
},{
    collection : "users"
});

module.exports = mongoose.model('User', User);