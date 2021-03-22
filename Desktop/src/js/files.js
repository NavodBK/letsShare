const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;

window.onload = async ()=>{
   
}

window.addEventListener('load',async function () {
    ipcRenderer.send('token:get')
  })

ipcRenderer.on('token:send', (event, res) => {
    console.log(res)
    axios.get('http://127.0.0.1:3000/files').then(function (response) {
        console.log(response);
      })
})