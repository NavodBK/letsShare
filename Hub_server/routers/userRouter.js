const express = require('express');
const { model, isValidObjectId } = require('mongoose');

const userModel = require('../models/userModel')
const router = new express.Router();

router.post('/register',(req,res)=>{
    const user = new userModel( {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    hub:req.body.hub,
    phone:req.body.phone,
    rating:req.body.rating
})

user.save().then(()=>{
    res.send('done');
})
})

router.post('/login',async (req,res)=>{
    const User = await userModel.findByCredentials(req.body.email,req.body.password);
    res.send(User);
})

router.patch('/user/update',async (req,res)=>{
    console.log(req.body)
    try{
        const User = await userModel.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
        })
        await User.save();
        res.send(User);
    }catch(e){
        console.log(e)
        res.send(e);
    }
    
})

router.get('/user/delete',async(req,res)=>{
    const User = await userModel.findByIdAndRemove(req.body.id)
    res.send(User);
})

router.get('/user',async(req,res)=>{
    const User = await userModel.find(req.query.id)
    res.send(User);
})

module.exports = router