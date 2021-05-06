const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;

const Dialogs = require('dialogs')
const dialogs = Dialogs()

const url = 'http://127.0.0.1:3000';
var token = ''

var mainContainer = document.getElementById('mainContainer')
document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('token:get')
  });
  
  ipcRenderer.on('token:send', (event, res) => {
      console.log(res)
      token=res;

      axios.get(url+'/groups',{
        headers: {
          'Authorization': 'Bearer '+token 
        }
      }).then(function(response){
        console.log(response)
        renderGroups(response.data)
      })
  })

  function renderGroups(groups){
      console.log(groups)
      var GroupsData= '';
    for(var i = 0; i < Object.keys(groups).length ; i++){
                    GroupsData += '<div class="card" style="width: 18rem;">'+
                                        '<div class="card-body">'+
                                        '<h5 class="card-title">Group name : '+groups[i].name+'</h5>'+
                                        '<p class="card-text">Member count : '+ groups[i].users.length+'</p>'+                                
                                        '<a class="card-link" onclick="joinGroup(\'' + groups[i]._id + '\')">join</a>'+
                                        '</div>'+
                                    '</div>'
      }
    mainContainer.innerHTML = GroupsData
  }

  //join a group
  function joinGroup(groupId){
    axios.post(url+'/groups/join',{'groupId':groupId},{
        headers:
        {
          'Authorization': 'Bearer '+token 
        }
      }).then((res)=>{
        console.log(res)
        if(res.status == '200' || 200){
            dialogs.alert('You have joined this group', ok => {
            });
        }else{
            dialogs.alert('An error occured, please try again later', ok => {
            })
        }
      })
  }

  //go back
  const backBtn = document.getElementById('backBtn')
  backBtn.addEventListener("click", function() {
    ipcRenderer.send("joinGroup:back") 
   });