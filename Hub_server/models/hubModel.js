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
    centralHubId:{
        type : mongoose.Schema.Types.ObjectId,
    },
    userCount:{
        type : Number,
        required :false
    },

})



const hub = mongoose.model('hub',hubSchema);

module.exports = hub;