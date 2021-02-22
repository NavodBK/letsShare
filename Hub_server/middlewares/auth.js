const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'blZuyy6LdenIikI0p8xK');
        const user = await userModel.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user = user;
        req.token = token;
    } catch (e) {
        res.status(401).send({error:'Authentication failed'})
    }
    next()
}

module.exports = auth