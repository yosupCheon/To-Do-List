const {app, BrowserWindow, ipcMain} = require('electron');
let fs = require('fs');

// receive data from renderer process -> main process
// add each list to the "scheduler.txt" file
ipcMain.on("item-from-renderer",(event, item)=>{
  let directApp = `${app.getPath('appData')}/electronScheduler/scheduler`;
  const text = `${directApp}/scheduler.txt`;
  if (!fs.existsSync(directApp)){
    fs.mkdirSync(directApp, { recursive: true });
  }

  event.sender.send("item-from-main", text)

})


function createWindow () {
  const win = new BrowserWindow({
    // change the size of the app
    width: 800,
    height: 600,
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

// window close this way works for macOS
app.on('window-all-closed', () => {
  app.quit()
})
