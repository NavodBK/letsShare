const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;
var fileDownload = require('js-file-download');

const Dialogs = require('dialogs')
const dialogs = Dialogs()

var url = '';
var token = ''

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('token:get')
});

ipcRenderer.on('token:send', (event, res) => {
  token=res.token;
  url = res.url;
})



function doupload() {
  const formData = new FormData()
  var private;
  var publicStatCheck = document.getElementById("Private");
  if(publicStatCheck.checked == true){
    private = true;
  }


  // add a binary file
  const element = document.getElementById('file')
  const file = element.files[0]
  formData.append('file', file, file.name)
  formData.append('publicStat',private)
  formData.append('categoris','[]')
  formData.append('groups','[]')
 
    axios({
      method: "post",
      url: url+"/files/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" ,'Authorization': 'Bearer '+token},
    },)
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
    
};

var uploadBtn = document.getElementById('uploadBtn') 
uploadBtn.addEventListener("click",function(){
    doupload();
    dialogs.alert('Your file will be uploaded', ok => {
      ipcRenderer.send('file:uploaded');
    });
    
})