const express = require('express');
var mongoose = require('mongoose');

const auth = require('../middlewares/auth');

const groupModel = require('../models/groupModel');
const fileModel = require('../models/fileModel');

const router = new express.Router();

router.get('/groups', auth, async (req, res) => {
    const groups = await groupModel.find({ publicStat: true });
    res.send(groups);
})

router.post('/groups/create', auth, (req, res) => {
    console.log(req.user)
    const group = new groupModel({
        name: req.body.name,
        publicStat: req.body.publicStat,
        admin: req.user._id,
    })
    try {
        group.save().then(() => {
            res.send(group)
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/groups/delete', auth,(req, res) => {
    try {
        const group = groupModel.findOneAndDelete({ _id: req.body.id, admin: req.user._id });
        res.send(group);
    } catch (error) {
        res.status(404).send(error);
    }

})

router.get('/groups/my',auth,async(req,res)=>{
    console.log(req.user._id);
    groups = await groupModel.find({'users.User':req.user._id})
    res.send(groups)
})

router.get('/group/:id',auth,async(req,res)=>{
    try {
        const thisGroup = await groupModel.findOne({_id : req.params.id , "users.User":req.user._id })
        const files = await fileModel.find({"groups.group":req.params.id})
        res.send(files);
    } catch (error) {
        res.status(401).send({"error":"You are not a member of this group"})
    }
     
})

router.post('/groups/addMember',auth, async (req, res) => {
    const groupId = req.body.groupId;
    const group = await groupModel.findOne({_id:groupId});
    const memberId = req.body.memberId;
    console.log(group.admin)
    console.log(req.user._id)
    console.log(group.admin === req.user._id)
    try {
        if (group.admin.toString().trim() == req.user._id.toString().trim()) {
            member= mongoose.Types.ObjectId(memberId)
            group.users = group.users.concat({User:member})
            group.save()
            res.status(200).send(group.users)
        } else {
            res.status(401).send()
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/groups/removeMember',auth, (req, res) => {

})

module.exports = router
