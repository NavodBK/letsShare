const { default: axios } = require('axios');
const electron = require('electron');
const {ipcRenderer}  =electron;

const Dialogs = require('dialogs')
const dialogs = Dialogs()

const url = 'http://127.0.0.1:3000';
var token = ''

const backBtn = document.getElementById('backBtn')
backBtn.addEventListener('click',function(){
    ipcRenderer.send("joinGroup:back") 
})