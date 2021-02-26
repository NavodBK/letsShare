const { app, BrowserWindow,dialog,ipcMain, remote } = require('electron')
const path  = require('path')

var token;
var window;


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

//login 
ipcMain.on('login:token',(eve,args)=>{
  token = args;
  window.loadFile('src/files.html')
})

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

