var mongoose = require('mongoose');

var archModel = new mongoose.Schema({
    id:{
      type:String
    },
    function:{
        type:String
    },
    element:{
         type:String
    },
    framework:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    }
}, {collection:'architecture'});

module.exports = mongoose.model('architecture',archModel);
