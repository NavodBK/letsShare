const electron = require('electron');
const {ipcRenderer}  =electron;
const { default: axios } = require('axios');

const url = 'http://127.0.0.1:3000';
var token = ''

document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('token:get')
    ipcRenderer.send('groupId:get')
  });

ipcRenderer.on('token:send', (event, res) => {
    token=res;
})

ipcRenderer.on('groupId:send', (event, res) => {
  console.log(res)
    axios.get(url+'/group/details/'+res,{
        headers: {
          'Authorization': 'Bearer '+token 
        }
      }).then(function(response){
        const headerDiv = document.getElementById("headerDiv");
        const header = '<h2>'+response.data.name+'</h2>';
        headerDiv.innerHTML = header;
      })
})

