const { app, BrowserWindow,dialog,ipcMain, remote } = require('electron')
const path  = require('path')
const axios = require('axios');

var token;
var window;

var groupIdForExchange;
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
  win.maximize();
  win.show();
  win.loadFile('src/index.html')
  window = this.win
}

//remove menu and prepare new window
function prepareWindow(window){
  window.removeMenu();

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

//group settings
ipcMain.on("settings:open",(event,groupId)=>{
  const settingsWin = new BrowserWindow({ width: 600, height: 900 ,webPreferences: {
    nodeIntegration: true
  }})
  groupIdForExchange = groupId;
  settingsWin.removeMenu();
  settingsWin.webContents.openDevTools()
  settingsWin.loadFile('src/groupSettings.html')
})

//send the group Id to the new window
ipcMain.on('groupId:get', (event) => {
  event.sender.send('groupId:send', groupIdForExchange)
})

//file upload window
ipcMain.on('fileUpload',async (eve,args)=>{
  // filePath = await dialog.showOpenDialog({ properties: ['openFile'] })
  // console.log(filePath.filePaths)

  upWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  prepareWindow(upWin)
  upWin.show();
  upWin.loadFile('src/upload.html')
  upWindow = this.upWin

})


//join or create group
ipcMain.on('group:new/join',async(eve,args)=>{
  upWin = new BrowserWindow({
    show: false,
    width: 800,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })
  prepareWindow(upWin)
  upWin.show();
  upWin.loadFile('src/groupSelect.html')
  upWindow = this.upWin
})

//open the relevent page to join or create group

ipcMain.on('groups:join',async(eve,args)=>{
  if (args=="Join") {
    console.log(args)
    window.loadFile('src/joinGroup.html')
  } else {
    console.log(args)
    window.loadFile('src/createGroup.html')
  }
  upWin.close()
})

//go back to files
ipcMain.on('joinGroup:back',async(eve,args)=>{
  window.loadFile('src/files.html')
})