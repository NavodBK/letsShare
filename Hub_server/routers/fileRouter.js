const express = require('express');
const multer = require('multer');
const path = require('path')

const fileModel = require('../models/fileModel');
const auth = require('../middlewares/auth')

const router = new express.Router();

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../storage'),
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

var upload = multer({
    storage:storage
})


router.get('/files',async (req, res) => {
    const files = await fileModel.find({ publicStat: true });
    res.send(files);
})

router.get('/files/my', auth, async (req, res) => {
    const myFiles = await fileModel.find({ owner: req.user.id });
    res.send(myFiles);
})

router.post('/files/upload', [auth,upload.single('file')], async (req, res) => {
    const file = req.file
    console.log(req)
    if(!file){
        res.status(400).send('Please upload a file')
    }else{
        const newFile = new fileModel({
            name: file.originalname,
            publicStat: req.publicStat,
            path: file.path,
            rating: 0,
            downloads: 0,
            owner: req.user.id,
            size: file.size,
            categories: req.categories,
            groups: req.groups
        })
        try{
            newFile.save();
            res.status(200).send()
        }catch(error){
            res.send('upload failed')
        }
    }
})

router.get('/files/download/:id', auth,async (req, res) => {
    serveFile = await fileModel.findById(req.params.id)
    serveFilePath = serveFile.path
    serveFile.downloads = serveFile.downloads +1;
    serveFile.save()
    res.sendFile(serveFilePath);
})

router.delete('/files/delete/:id', auth, (req, res) => {
    const _id = req.params._id;
    fileModel.findOneAndDelete({ _id, owner: req.user._id })
})

router.get('/files/request/:id', auth, (req, res) => {

})

router.post('/files/upvote', auth,async (req, res) => {
    try {
        const voteFile = await fileModel.findById(req.body.id)
        voteFile.rating = voteFile.rating + 1 
        voteFile.save();
    } catch (error) {
        res.status(500).send()
    }
    
    res.send()
})

router.post('/files/downvote', auth,async (req, res) => {
    try {
        const voteFile = await fileModel.findById(req.body.id)
        voteFile.rating = voteFile.rating - 1 
        voteFile.save();
    } catch (error) {
        res.status(500).send()
    }
    
    res.send()
})

router.post('/files/report', auth, (req, res) => {

})

router.post('/files/add', auth, (req, res) => {

})

router.post('/files/remove', auth, (req, res) => {

})

module.exports = router