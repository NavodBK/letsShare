const express = require('express');
const { model, isValidObjectId } = require('mongoose');

const userModel = require('../models/userModel')
const auth = require('../middlewares/auth')
const router = new express.Router();

router.post('/register',async (req,res)=>{
    const user = new userModel(req.body);

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
        const token = await User.genorateAuthToken();
        res.send({
            user: User,
            token:token
        });
    } catch (error) {
        res.status(401).send("invalid Login Data")
    }
    
})

router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()  
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()  
    }
})

router.patch('/user/update',auth,async (req,res)=>{
    try{
        const User = await userModel.findByIdAndUpdate(req.user._id,{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
        })
        await User.save();
        res.send(User);
    }catch(e){
        res.send(e);
    }
    
})

router.get('/user/delete',auth,async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user);
    }catch(e){
        res.status(500).send()
    }
})

router.get('/user/me',auth,async(req,res)=>{
    res.send(req.user)
})

module.exports = router