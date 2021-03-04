const electron = require('electron');
const {ipcRenderer}  =electron;

window.onload = async ()=>{
    async () => {
        const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
        console.log(result)
    }
}

