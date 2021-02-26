const axios = require('axios');
const { Main } = require('electron');
const electron = require('electron');
const {ipcRenderer}  =electron;

var submitBtn = document.getElementById('submit');

submitBtn.addEventListener("click", function() {
    var userName = document.getElementById('un');
    var pw = document.getElementById('pass');

    axios.post('http://localhost:3000/login',{
    "email":userName.value,
    "password":pw.value
    }).then(function (res){
        const token = res.data.token
        ipcRenderer.send('login:token',token)
    }).catch(function(err){
        if(err.response.status == 401){
            ipcRenderer.send('login:failed','401')
        }else{
            console.log("an error")
        }
    })
    
    
  });

var regBtn = document.getElementById('register') 
regBtn.addEventListener("click",function(){
    ipcRenderer.send('login:register')
})