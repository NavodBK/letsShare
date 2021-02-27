const electron = require('electron');
const {ipcRenderer}  =electron;

window.onload = async ()=>{
    console.log("onload")
        const files = await ipcRenderer.invoke('filelist:send')
        if(!files){
            console.log('No files')
        }else{
            console.log(files)
        }
    }


