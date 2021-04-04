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
    console.log(res)
    token=res;
    axios.get(url+'/files').then(function (response) {
        renderFiles(response.data,"Public")        
      })
    axios.get(url+'/groups/my',{
      headers: {
        'Authorization': 'Bearer '+token 
      }
    }).then(function(response){
      var groupList ="";
      console.log(response)
      for(var i = 0; i < Object.keys(response.data).length ; i++){
        groupList += '<div class="side-tab" onclick="getGroupFiles(\''+response.data[i]._id+'\','+ '\''+response.data[i].name+'\')">'+
                        '<img src="../assets/img/lock.jpg" class="private-ico">'+
                        '<p>'+response.data[i].name+'</p>'+
                    '</div>'
      }
      groupListDiv = document.getElementById('myGroupList');
      groupListDiv.innerHTML = groupList;
    })
})

//render the files
function renderFiles(filesArr,groupName){

  pageHeader = document.getElementById("page-header")
  pageHeader.innerHTML = '<h3>'+ groupName +' : Files </h3>'
  console.log(groupName)
  const body_files = document.getElementById('body-files');
  var fileData = '';

  for(var i = 0; i < Object.keys(filesArr).length ; i++){
    fileData += '<div class="card text-left" style="width: 18rem;">'+
                  '<div class="card-body">'+
                    '<h5 class="card-title">'+filesArr[i].name+'</h5>'+
                    '<p class="card-text">Owner : '+filesArr[i].owner+'</p>'+
                    '<p class="card-text">Rating : '+filesArr[i].rating+'</p>'+
                    '<p class="card-text">Downloads : '+filesArr[i].downloads+'</p>'+
                    '<p onclick="download(\'' + filesArr[i]._id + '\',\'' + String(filesArr[i].name) + '\')" class="btn btn-primary">Download</p>'+
                    '</div>'+
                '</div>';
  }
  body_files.innerHTML = fileData;
}

//get files related to the group
function getGroupFiles(groupId,groupName){
  if(groupId == 0){
    getUrl = url+'/files'
  }
  else{
    getUrl = url+'/group/'+groupId
  }
  axios.get(getUrl, {
    headers: {
      'Authorization': 'Bearer '+token 
    }
    })
    .then((res) => {
      if(!res.data.length ==0){
        renderFiles(res.data,groupName)
      }else{
        const body_files = document.getElementById('body-files');
        body_files.innerHTML = "<h2> the group is empty</h2>";
      }
      
    })
    .catch((error) => {
      console.error(error)
    })
}

//download file function
function download(id,filename){
  axios.get(url+'/files/download/'+id, {
  responseType: 'blob',
  headers: {
    'Authorization': 'Bearer '+token 
  }
  })
  .then((res) => {
    fileDownload(res.data, filename);
  })
  .catch((error) => {
    console.error(error)
  })
}

//VoteFile
function upvote(id,upOrDown){
  if(upOrDown == "u"){
    thisUrl = url+'/files/upvote'
  }else{
    thisUrl = url+"/files/downvote"
  }
  axios.post(thisUrl, {
    headers: {
      'Authorization': 'Bearer '+token 
    },data:{
      "id":id
    }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
}
