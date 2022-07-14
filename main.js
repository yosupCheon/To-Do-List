const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
let fs = require('fs');


// receive data from renderer process -> main process
// add each list to the "scheduler.txt" file
ipcMain.on("item-from-renderer",(event, item)=>{
  //item = item.concat('\n');
  fs.appendFile('scheduler.txt', item, function (err) {
    if (err) return console.log(err);
  });
})


function createWindow () {
  const win = new BrowserWindow({
    //width: 800,
    //height: 600,
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.loadFile('index.html')
  //win.webContents.openDevTools()
}

app.whenReady().then(()=> {
  createWindow();
  app.on('activate',()=>{
    if (BrowserWindow.getAllWindows().length===0){createWindow();}
  });
});   

app.on('window-all-closed', () => {
  //console.log("closed");
  app.quit()
})
