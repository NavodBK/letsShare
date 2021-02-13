const express = require('express');

const groupModel = require('../models/groupModel');

const router = new express.Router();

router.get('/groups',(req,res)=>{
    const groups = groupModel.find({});
    res.send(groups);
})

router.post('/groups/create',(req,res)=>{
    const group = groupModel({
        name:req.body.name,
        publicStat:req.body.publicStat,
        admin:req.body.admin,
        requests:req.body.requests,
        users:req.body.users
    })
    group.save().then(()=>{
        res.send(group)
    })
})

router.post('/groups/delete',(req,res)=>{
    const group = group.findByIdAndDelete(_id =req.body.id)
})


router.post('/groups/add',(req,res)=>{

})

router.post('/groups/remove',(req,res)=>{

})


