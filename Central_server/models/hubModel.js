const mongoose = require('mongoose');


const hubSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    admin:{
        type : String,
        required :true,
    },
    url:{
        type:String,
        required:true
    }
})



const hub = mongoose.model('hub',hubSchema);

module.exports = hub;