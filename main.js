const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadFile ('index.html');
}

app.whenReady().then(()=> {
  createWindow();

  app.on('activate',()=>{
    // for macOS
    if (BrowserWindow.getAllWindows().length===0){createWindow();}
  });
});