const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validator = require('validator');
const jwt = require('jsonwebtoken');

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
    },
    tokens:[{
        token:{
            type : String,
            required : true
        }
    }]

})

userSchema.virtual('files',{
    ref:'file',
    localField :'_id',
    foreignField : 'owner'
})

userSchema.virtual('groups',{
    ref:'group',
    localField :'_id',
    foreignField : 'users.user'
})

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens

    return userObject;
}

userSchema.methods.genorateAuthToken = async function(){
    const user= this;
    const token = jwt.sign({_id:user._id.toString()},'blZuyy6LdenIikI0p8xK');
    user.tokens =  user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async function(userEmail,userPassword){
    const User = await user.findOne({'email':userEmail});
    
    if(!User){
        throw new Error('unable to find user');
    }
    const isMatch = await bcrypt.compare(userPassword,User.password);

    if(!isMatch){
        throw new Error('unable to lgin');
    }else{
        return User;
    }
}


const user = mongoose.model('user',userSchema);

module.exports = user;