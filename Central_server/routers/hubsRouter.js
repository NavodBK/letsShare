const express = require('express');
var mongoose = require('mongoose');

const hubsModel = require('../models/hubModel');
const { Router } = require('express');
const hub = require('../models/hubModel');

const router = new express.Router();


router.post('/hubs/register',async(req,res)=>{
    console.log("req")
    const hub = new hubsModel({
        "name":req.body.name,
        "admin":req.body.admin,
        "url":req.body.url
    })
    try {
        await hub.save()
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

router.post('/hubs/update',async(req,res)=>{
    try {
        var hubId = req.body.id;
        const hub = await hubsModel.findById(hubId);
        hub.url = req.body.url;
        hub.save()
        console.log("IP updated")
        res.send(hub);
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})
module.exports = router
