const express = require('express');
const path = require('path')

const app = express();

//path to public folder
const static_path = path.join(__dirname, './public/')

//Serve static html files
app.use(express.static(static_path));



//Set 404
app.get('*', (req, res) => {
    res.sendFile(path.join(static_path, '404.html'))
})

// Run the server
app.listen(3000, () => {
    console.log('server is running on port : 3000')
})