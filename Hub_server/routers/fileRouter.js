const express = require('express');

const fileModel = require('../models/fileModel');

const router = new express.Router();

router.get('/files',(req,res)=>{
    const files = fileModel.find({});
    res.send(files);
})

router.get('/files/my',(req,res)=>{
    const myFiles = fileModel.find({owner: req.params/owner});
    res.send(myFiles);
})

router.post('/files/upload',(req,res)=>{

})

router.get('/files/download/:id',(req,res)=>{
    
})

router.delete('/files/delete/:id',(req,res)=>{
    
})

router.get('/files/request/:id',(req,res)=>{
    
})

router.post('/files/upvote',(req,res)=>{
    
})

router.post('/files/downvote',(req,res)=>{
    
})

router.post('/files/report',(req,res)=>{
    
})

router.post('/files/add',(req,res)=>{
    
})

router.post('/files/remove',(req,res)=>{
    
})