const express = require('express');
const { model, isValidObjectId } = require('mongoose');

const userModel = require('../models/userModel')
const router = new express.Router();

router.post('/register',async (req,res)=>{
    const user = new userModel(req.body);
    console.log(user.password)

    try {
        await user.save();
        const token = await user.genorateAuthToken();
        res.status(201).send({user,token});
    } catch (error) {
        res.status(401).send(error)
    }
})

router.post('/login',async (req,res)=>{
    try {
        const User = await userModel.findByCredentials(req.body.email,req.body.password);
        const token = User.genorateAuthToken();
        res.send({
            user: User,
            token:token
        });
    } catch (error) {
        res.status(400).send()
    }
    
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