const express = require('express');
var mongoose = require('mongoose');

const hubsModel = require('../models/hubModel');
const { Router } = require('express');

const router = new express.Router();



router.get('/hubs',async (req,res)=>{
    try {
        thisHub= await hubsModel.find()
        res.send(thisHub)
    } catch (error) {
        console.error();
    }
    

})
module.exports = router
