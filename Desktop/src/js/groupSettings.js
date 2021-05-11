const electron = require('electron');
const {ipcRenderer}  =electron;
const { default: axios } = require('axios');

const Dialogs = require('dialogs')
const dialogs = Dialogs()

const url = 'http://192.168.1.3:3000';
var token = ''
var groupId =''

document.addEventListener("DOMContentLoaded", function() {
    ipcRenderer.send('token:get')
    ipcRenderer.send('groupId:get')
  });

ipcRenderer.on('token:send', (event, res) => {
    token=res;
})

ipcRenderer.on('groupId:send', (event, res) => {
  console.log(res)
  groupId= res;
  console.log(res)
    axios.get(url+'/group/details/'+res,{
        headers: {
          'Authorization': 'Bearer '+token 
        }
      }).then(function(response){
        console.log(response)
        const headerDiv = document.getElementById("headerDiv");
        const header = '<h2 align="center">'+response.data.thisGroup.name+'</h2>'+
        '<div id="headerDetails" >'+
        '<h3>Members : '+response.data.thisGroup.users.length+'</h3>'+
        '<h3>Files : '+response.data.files.length+'</h3>'+
        '<h3>Admin email : '+response.data.thisGroup.admin+'</h3>'+
        '</div>'

        headerDiv.innerHTML = header;

        var adminC = document.getElementById('adminC');
        if(response.data.userId == response.data.thisGroup.admin){
          adminC.innerHTML = 
          '<button type="button" class="btn btn-primary btn-sm" onclick="addMember()">Add member</button>'+
          '<button type="button" class="btn btn-warning btn-sm" onclick="remMember()">Remove member </button>'+
          '<button type="button" class="btn btn-danger btn-sm" onclick="deleteG()">Delete group</button>'
        }
        

        console.log(response)
      })
})

function addMember(){
  dialogs.prompt('Enter the description', ok => {
    if(ok == "" || null){
      dialogs.alert('Enter the email of the user to add', ok => {
                
      })
    }else{
      try {
        axios.post(url+'/groups/addMember',{
          'groupId':groupId,
          'email':ok
      
        },{
          headers:
          {
            'Authorization': 'Bearer '+token 
          }
        }).then((res)=>{
          console.log(res)
          if(res.status == '200' || 200){
              dialogs.alert('member added to the group', ok => {
              });
          }else{
              dialogs.alert('An error occured, please try again later', ok => {
              })
          }
        })
      } catch (error) {
        dialogs.alert('An error occured, please try again later', ok => {
        })
      }
   
  }
  })

  
}

function remMember(){
  console.log("rem")
}


function deleteG(){
  console.log("rdel")
}