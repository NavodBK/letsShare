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
    centralUrl:{
        type : String,
    },
    userCount:{
        type : Number,
        required :true
    },

})



const hub = mongoose.model('hub',hubSchema);

module.exports = hub;