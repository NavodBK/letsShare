const express = require('express');

const fileModel = require('../models/fileModel');
const auth = require('../middlewares/auth')

const router = new express.Router();

router.get('/files', (req, res) => {
    const files = fileModel.find({ publicStat: true });
    res.send(files);
})

router.get('/files/my', auth, (req, res) => {
    const myFiles = fileModel.find({ owner: req.user._id });
    res.send(myFiles);
})

router.post('/files/upload', auth, (req, res) => {

})

router.get('/files/download/:id', auth, (req, res) => {

})

router.delete('/files/delete/:id', auth, (req, res) => {
    const _id = req.params._id;
    fileModel.findOneAndDelete({ _id, owner: req.user._id })
})

router.get('/files/request/:id', auth, (req, res) => {

})

router.post('/files/upvote', auth, (req, res) => {

})

router.post('/files/downvote', auth, (req, res) => {

})

router.post('/files/report', auth, (req, res) => {

})

router.post('/files/add', auth, (req, res) => {

})

router.post('/files/remove', auth, (req, res) => {

})

module.exports = router