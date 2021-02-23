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

groupSchema.methods.ifAdmin = async(userid,groupId)=>{
    const group = this;
    const thisGroup = await group.findOne({_id:groupId})
    if(!thisGroup.admin == userid){
        throw new Error('You are not the admin of this group')
    }
    return group.admin;
}

const group = mongoose.model('group',groupSchema);

module.exports = group;