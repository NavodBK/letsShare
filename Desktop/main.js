const { app, BrowserWindow,dialog,ipcMain, remote } = require('electron')
const path  = require('path')
const axios = require('axios');

var token;
var window;

axiosConfig = {
  headers:{
    Authorization: "Bearer " + token
  }
}

//main windoe create
function createWindow () {
  win = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  prepareWindow(win)
  win.show();
  win.loadFile('src/index.html')
  window = this.win
}

//remove menu and prepare new window
function prepareWindow(window){
  window.removeMenu();
  window.maximize();
  window.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}) 

//login:pass
ipcMain.on('login:token',(eve,args)=>{
  token = args;
  window.loadFile('src/files.html')
})

//login:failed
ipcMain.on('login:failed',(eve,args)=>{
  if(args==401){
    dialog.showMessageBox({
      title:'Authentication failed',
      type:'error',
      buttons:['Try again'],
      message:'User not found. Please check login details'
    })
  }
})

//login:register
ipcMain.on('login:register',()=>{
  window.loadFile('src/register.html')
})

//login:forgot
ipcMain.on('login:forgot',()=>{
  window.loadFile('src/forgot.html')
})

//send the token
ipcMain.on('token:get', (event) => {
  var res = token;
  event.sender.send('token:send', res)
})

//Change screen on logout
ipcMain.on('user:logout',()=>{
  window.loadFile('src/index.html')
})

//refresh the files.html
ipcMain.on("files:refresh",()=>{
  window.loadFile('src/files.html')
})

ipcMain.on("settings:open",(event,groupId)=>{
  console.log(groupId)
  const settingsWin = new BrowserWindow({ width: 800, height: 600 })
  settingsWin.removeMenu();
  // Or load a local HTML file
  settingsWin.loadFile('src/index.html')

})