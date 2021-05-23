const express = require('express');
const fs = require('fs');
const path = require('path');
const ip = require('ip');
const cron = require('node-cron');

const db = require('../db/db');

const userRouter = require('../routers/userRouter');
const fileRouter = require('../routers/fileRouter');
const groupRouter = require('../routers/groupRouter');
const hubRouter = require('../routers/hubRouter');
const { default: axios } = require('axios');

const hubModel = require('../models/hubModel');

const app = express();
app.use(express.json());


//routers
app.use(userRouter);
app.use(fileRouter);
app.use(groupRouter);
app.use(hubRouter);

//main server url
const mainServer = 'https://letsshare.tk'

//path to public folder
const static_path = path.join(__dirname, '../public/')

//Serve static html files
app.use(express.static(static_path));

//path to files
const files = path.join(__dirname, '../storage')

//API endpoint for list dir
app.get('/files', (req, res) => {
    fs.readdir(files, (err, fileList) => {
        res.send(fileList);
    })

});



//Set 404
app.get('*', (req, res) => {
    res.sendFile(path.join(static_path, '404.html'))
})

async function updateIp (){
    const hub = await hubModel.findOne();
    if(hub == null){
        console.log("hub not registered");
    }else{
        const response = await axios.post('https://letsshare.tk/hubs/update',{
            "id":hub.centralHubId,
            "url":ip.address() + ':3005'
        })
        console.log(response.status)
    }
}

// Run the server
app.listen(3005, () => {
    console.log('Server is running on '+ip.address()+' on port : 3005')
    updateIp();
    cron.schedule('*/1 * * * *', () => {
        updateIp();
      });
})