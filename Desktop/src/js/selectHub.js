const { default: axios } = require("axios");
const electron = require('electron');
const {ipcRenderer}  =electron;


document.addEventListener("DOMContentLoaded", async function() {
    hubs = await axios.get("https://letsshare.tk"+"/hubs");
    hubs= hubs.data;
    hubsDiv = document.getElementById('hubs')
    hubsArr ='';
    console.log(hubs)
    if(hubs.length == 0){
        hubsDiv.innerHTML = "<h2> We cannot find the hubs list. please try again</h2>"
    }else{
        for(var i = 0; i < Object.keys(hubs).length ; i++){
            hubsArr  += '<button type="button" class="btn btn-outline-primary btnCustom" onClick ="setHub(\''+hubs[i].url+'\')">'+hubs[i].name+'</button>';
        }
        hubsDiv.innerHTML = hubsArr;
    }

});

function setHub(hubUrl){
    ipcRenderer.send('hubUrl:set',hubUrl);
}