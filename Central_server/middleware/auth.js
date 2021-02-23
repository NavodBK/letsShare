const jwt = require('jsonwebtoken');
const hubModel = require('../models/hubModel');

const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'blZuyy6LdenIikI0p8xK');
        const hub = await hubModel.findOne({_id:decoded._id,'tokens.token':token})
        if(!hub){
            throw new Error()
        }
        req.hub = hub;
        req.token = token;
    } catch (e) {
        res.status(401).send({error:'Authentication failed'})
    }
    next()
}

module.exports = auth