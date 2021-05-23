const { default: axios } = require('axios');
const express = require('express');
const ip = require('ip');

const hubModel = require('../models/hubModel');



const router = new express.Router();

router.get('/',async(req,res)=>{
    const hub = await hubModel.find();
    if(hub.length==0){
        res.send("not registered")
    }else{
        res.send('registered')
    }
})

router.post('/hub/register',async(req,res)=>{
    console.log('req');
    const mainServer = req.body.mainServer;
    try {
        const response = await axios.post(mainServer+'/hubs/register', {
            "name":req.body.name,
            "admin":req.body.admin,
            "url": ip.address()
          })
          
          const hub = new hubModel({
              "name": req.body.name,
              "admin":req.body.admin,
              "centralHubId":response.data._id
          })
          await hub.save();
          console.log(response.data._id)
          res.send(response.data);
          
    } catch (error) {
        res.send(error)
    }
    
})

module.exports = router