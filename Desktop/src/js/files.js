const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;
               

const body_files = document.getElementById('body-files');

const url = 'http://127.0.0.1:3000';
var token = ''

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('token:get')
});

ipcRenderer.on('token:send', (event, res) => {
    console.log(res)
    token=res;
    axios.get(url+'/files').then(function (response) {
        console.log(response);
        var fileData = '';
        for(var i = 0; i<Object.keys(response.data).length ; i++){
          fileData += '<div class="card text-center" style="width: 18rem;">'+
                        '<div class="card-body">'+
                          '<h5 class="card-title">'+response.data[i].name+'</h5>'+
                          '<p class="card-text">Owner : '+response.data[i].owner+'</p>'+
                          '<p class="card-text">Rating : '+response.data[i].rating+'</p>'+
                          '<p class="card-text">Downloads : '+response.data[i].downloads+'</p>'+
                          '<p onclick="download(\'' + response.data[i]._id + '\')" class="btn btn-primary">Download</p>'+
                        '</div>'+
                      '</div>';
        }
        console.log(response.data)
        body_files.innerHTML = fileData;
      })
})


//download file function
function download(id){
  console.log(id)
  console.log(url+'/files/download/'+id)
  axios.get(url+'/files/download/'+id, {
  headers: {
    'Authorization': 'Bearer '+token 
  }
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error)
  })
}