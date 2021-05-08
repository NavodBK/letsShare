const express = require('express');
var mongoose = require('mongoose');

const hubsModel = require('../models/hubModel');
const { Router } = require('express');

const router = new express.Router();


router.post('/hubs/register',async(req,res)=>{
    const hub = new hubsModel({
        "name":req.body.name,
        "admin":req.body.admin,
        "url":req.body.url
    })
    try {
        await hub.save()
        console.log(hub)
        res.status(200).send(hub)
    } catch (error) {
        res.send(error)
    }
})

router.get('/hubs',async (req,res)=>{
    try {
        Hubs= await hubsModel.find()
        res.send(Hubs)
    } catch (error) {
        console.error();
    }

})
module.exports = router
