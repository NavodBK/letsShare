const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;

const mainServer = "http://localhost:3001";

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