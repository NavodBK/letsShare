const express = require('express');
const fs = require('fs');
const path = require('path');

const db = require('../db/db');

const userRouter = require('../routers/userRouter');
const fileRouter = require('../routers/fileRouter');
const groupRouter = require('../routers/groupRouter');

const app = express();
app.use(express.json());


//routers
app.use(userRouter);
app.use(fileRouter);
app.use(groupRouter);


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

// Run the server
app.listen(3000, () => {
    console.log('server is running on 127.0.0.1 on port : 3000')
})