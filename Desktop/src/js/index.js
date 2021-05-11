const axios = require('axios');
const { Main } = require('electron');
const electron = require('electron');
const {ipcRenderer}  =electron;

const url = 'http://192.168.1.3:3000';
//login
var submitBtn = document.getElementById('submit');
submitBtn.addEventListener("click", function() {
    var userName = document.getElementById('un');
    var pw = document.getElementById('pass');

    axios.post(url+'/login',{
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

//register button
var regBtn = document.getElementById('register') 
regBtn.addEventListener("click",function(){
    ipcRenderer.send('login:register')
})

//forgot button
var forgotBtn = document.getElementById('forgot')
forgotBtn.addEventListener('click',function(){
    ipcRenderer.send('login:forgot')
})