const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    publicStat:{
        type : Boolean,
        required :true
    },
    admin:{
        type : String,
        required :true
    },
    requests:{
        type : Number,
        required :true
    },
    users:{
        type : [String],
        required :true
    }

})



const group = mongoose.model('group',groupSchema);

module.exports = group;