const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    email:{
        type : String,
        required :true,
        unique:true,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Please enter an email")
            }
        }
    },
    password:{
        type : String,
        required :true
    },
    hub:{
        type : String,
        required :true
    },
    phone:{
        type : Number,
        required :true
    },
    rating:{
        type : Number,
        required :true
    }

})

userSchema.pre('save',async function(next){
    const user = this;
    user.password = await bcrypt.hash(user.password,8);
    next();
})


userSchema.statics.findByCredentials = async function(userEmail,userPassword){
    const User = await user.findOne({'email':userEmail});

    if(!User){
        throw new Error('unable to find user');
    }
    const isMatch = await bcrypt.compare(userPassword,User.password);
    console.log(isMatch);

    if(!isMatch){
        throw new Error('unable to lgin');
    }else{
        return User;
    }
}


const user = mongoose.model('user',userSchema);

module.exports = user;