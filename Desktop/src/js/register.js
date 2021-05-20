const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;

var mainServer = "";

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('token:get')
});

ipcRenderer.on('token:send', (event, res) => {
  mainServer= res.url;
})

var goBackButton = document.getElementById('goBack');
goBackButton.addEventListener("click", function() {
   ipcRenderer.send("user:logout") 
  });



document.addEventListener("DOMContentLoaded", function() {
    axios.get(mainServer+'/hubs')
        .then((res) => {
         
        })
        .catch((error) => {
          console.error(error)
        })
  });