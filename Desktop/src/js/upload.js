const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;
var fileDownload = require('js-file-download');


const url = 'http://127.0.0.1:3000';
var token = ''

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('token:get')
});

ipcRenderer.on('token:send', (event, res) => {
    token=res;
})



function doupload() {
    let data = document.getElementById("file").files[0];
    let entry = document.getElementById("file").files[0];
    console.log('doupload',entry,data)
    fetch('uploads/' + encodeURIComponent(entry.name), {method:'PUT',body:data});
    alert('your file has been uploaded');
    // location.reload();

    axios.post('http://localhost:3000/files/upload',{
      "file":data,
      "publicStat": false,
      "categories" : ["image"],
      "groups":[]
      },{
    headers: {
      'Authorization': 'Bearer '+token
    }
    }).then(function (res){
       console.log(res)
    }).catch(function(err){
       console.log(err)
    })

    axios.post(Helper.getUserAPI(), data, {
      headers: headers
    })
    .then((response) => {
      dispatch({
        type: FOUND_USER,
        data: response.data[0]
      })
    })
    .catch((error) => {
      dispatch({
        type: ERROR_FINDING_USER
      })
    })
};

var uploadBtn = document.getElementById('uploadBtn') 
uploadBtn.addEventListener("click",function(){
    doupload();
})