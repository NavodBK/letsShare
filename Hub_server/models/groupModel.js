const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    publicStat:{
        type : Boolean,
        required :true,
        default: true
    },
    admin:{
        type : mongoose.Schema.Types.ObjectId,
        required :true,
        ref:'user'
    },
    requests:[{
        request:{
            type : mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'user',
        }
    }],
    users:[{
        User:{
            type : mongoose.Schema.Types.ObjectId,
            ref:'user',
            required :true
        }
    }]

})


const group = mongoose.model('group',groupSchema);

module.exports = group;