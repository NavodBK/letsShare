const express = require('express');
const auth = require('../middlewares/auth')

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

router.post('/groups/delete', (req, res) => {
    try {
        const group = groupModel.findOneAndDelete({ _id: req.body.id, admin: req.user._id });
        res.send(group);
    } catch (error) {
        res.status(404).send(error);
    }

})


router.post('/groups/add', (req, res) => {

})

router.post('/groups/remove', (req, res) => {

})


