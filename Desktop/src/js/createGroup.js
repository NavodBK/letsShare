const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;

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

const backBtn = document.getElementById('backBtn')
backBtn.addEventListener('click',function(){
    ipcRenderer.send("joinGroup:back") 
})
const createBtn = document.getElementById('createBtn')
createBtn.addEventListener('click',function(){
    var groupName = document.getElementById('gName').value;
    var publicStat = document.getElementById('publicStat').checked;

    if(groupName=="" || null){
        dialogs.alert('Please enter a name for the group', ok => {
        });
    }else{
        axios.post(url+'/groups/create',{
            'name':groupName,
            'publicStat':!publicStat
        },{
            headers:
            {
              'Authorization': 'Bearer '+token 
            }
          }).then((res)=>{
            console.log(res)
            if(res.status == '200' || 200){
                dialogs.alert('Group created. find it on the goups list', ok => {
                    ipcRenderer.send("joinGroup:back") 
                });
            }else{
                dialogs.alert('An error occured, please try again later', ok => {
                })
            }
          })
    }
})