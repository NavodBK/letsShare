const express = require('express');
const auth = require('../middlewares/auth');
const group = require('../models/groupModel');

const groupModel = require('../models/groupModel');

const router = new express.Router();

router.get('/groups', auth, (req, res) => {
    const groups = groupModel.find({ publicStat: true });
    res.send(groups);
})

router.post('/groups/create', auth, (req, res) => {
    const group = groupModel({
        name: req.body.name,
        publicStat: req.body.publicStat,
        admin: req.user._id,
    })
    group.save().then(() => {
        res.send(group)
    })
})

router.post('/groups/delete', auth,(req, res) => {
    try {
        const group = groupModel.findOneAndDelete({ _id: req.body.id, admin: req.user._id });
        res.send(group);
    } catch (error) {
        res.status(404).send(error);
    }

})

router.get('/group/:id',auth,(req,res)=>{
    
})

router.post('/groups/addMember',auth, (req, res) => {
    const groupId = req.body.groupId;
    const group = groupModel.findOne({id:groupId});
    const member = req.body.member.id;
    if(group.ifAdmin(req.user._id,groupId)){
        group.users = group.users.concat({member})
        res.send(member)
    }else{
        res.status(401).send();
    }
})

router.post('/groups/removeMember',auth, (req, res) => {

})

module.exports = router
