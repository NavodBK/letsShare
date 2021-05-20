const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;
var fileDownload = require('js-file-download');


var url = '';
var token = ''

document.addEventListener("DOMContentLoaded", function() {
  ipcRenderer.send('token:get')
});

ipcRenderer.on('token:send', (event, res) => {
    console.log(res)
    token=res.token;
    url = res.url;
    axios.get(url+'/files').then(function (response) {
        renderFiles(response.data,"Public",0)        
      })
    axios.get(url+'/groups/my',{
      headers: {
        'Authorization': 'Bearer '+token 
      }
    }).then(function(response){
      var groupList ="";
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
function renderFiles(filesArr,groupName,groupId){

  pageHeader = document.getElementById("page-header")
  if(groupId==0){
    headerHtml = '<h3>'+ groupName +' : Files </h3>'
  }else{
    headerHtml = '<h3>'+ groupName +' : Files </h3>'+
    '<button type="button" id="settingsBtn" class="btn btn-info"'+
    ' onclick="openSettings(\''+groupId+'\')">Group settings</button>'
  }
  pageHeader.innerHTML = headerHtml
  const body_files = document.getElementById('body-files');
  var fileData = '';

  if(filesArr.length == 0){
    body_files.innerHTML = "<h2>The group is empty</h2>"
  }else{
    for(var i = 0; i < Object.keys(filesArr).length ; i++){
      fileData += '<div class="card text-left" style="width: 18rem;">'+
                    '<div class="card-body">'+
                      '<h5 class="card-title">'+filesArr[i].name+'</h5>'+
                      '<p class="card-text">Owner : '+filesArr[i].owner+'</p>'+                    
                      '<div class="ratings">'+
                      '<p>Rating : '+filesArr[i].rating+'</p>'+
                      '<div>'+
                      '<img class="voteImg" src="../assets/img/report.png" onclick="report(\'' + filesArr[i]._id + '\',\'u\')" style="border-radius: 90% !important;"></img> '+
                      '<img class="voteImg" src="../assets/img/up.png" onclick="vote(\'' + filesArr[i]._id + '\',\'u\')"></img> '+
                      '<img class="voteImg" src="../assets/img/down.png" onclick="vote(\'' + filesArr[i]._id + '\',\'d\')"></img>'+
                      '</div>'+
                      '</div>'+
                      '<p class="card-text">Downloads : '+filesArr[i].downloads+'</p>'+                    
                      '<p onclick="download(\'' + filesArr[i]._id + '\',\'' + String(filesArr[i].name) + '\')" class="btn btn-primary">Download</p>'+
                      '</div>'+
                  '</div>';
    }
    body_files.innerHTML = fileData;
  }

  
}

//report
function report(id) {
const Dialogs = require('dialogs')
const dialogs = Dialogs()

      dialogs.prompt('Enter the description', ok => {
        console.log(ok)
        if (ok == "" || undefined) {
          dialogs.alert('Enter the report description to submit a report', ok => {
                
          })
        } else {
          axios.post(url+"/files/report",{
            'file':id,
            'desc' :ok 
          },
          {
            headers:
            {
              'Authorization': 'Bearer '+token 
            }
            })
            .then((res) => {
              console.log(res.status)
              if(res.status == 200){
                console.log(res)
                dialogs.alert('Report submitted', ok => {
                  console.log('alert', ok)
                })
              }else{
                console.log(res)
                dialogs.alert('Somthing went wrong! please try again later', ok => {
                  
                })
              }
              
            })
            .catch((error) => {
              console.error(error)
            })
        }
        
      })
    
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
        renderFiles(res.data,groupName,groupId)      
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
    ipcRenderer.send('files:refresh')
  })
  .catch((error) => {
    console.error(error)
  })
}

//VoteFile
function vote(id,upOrDown){
  if(upOrDown == "u"){
    thisUrl = url+'/files/upvote'
  }else{
    thisUrl = url+'/files/downvote'
  }
  axios.post(thisUrl,{'id':id }, {headers:
    {
      'Authorization': 'Bearer '+token 
    }
  })
    .then((res) => {
      console.log(res)
      ipcRenderer.send('files:refresh')
    })
    .catch((error) => {
      console.error(error)
    })
}

//group settings
function openSettings(groupId){
  ipcRenderer.send("settings:open",groupId)
}

//logout user
function logout(){
  axios.post(url+'/users/logout',{'id':"id "},{
    headers:
    {
      'Authorization': 'Bearer '+token 
    }
  }).then((res)=>{
    ipcRenderer.send('user:logout')
    console.log(res)
  })
}

//file upload btn
var submitBtn = document.getElementById('uploadBtn');
submitBtn.addEventListener("click", function() {
   ipcRenderer.send("fileUpload") 
  });

//new group
var newGroupBtn = document.getElementById('groupPlus');
newGroupBtn.addEventListener('click',function(){
  ipcRenderer.send("group:new/join") 
});