const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const path = require('path');
const url = require('url');
const request = require('request');
const Q = require('q');


const authLogin = require('./js/auth-window')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


function createWindow() {
  // Create the browser window.

  win = new BrowserWindow({ width: 400, height: 400, title: "Tekcop", show: false, icon: path.join(__dirname, 'images', 'logo2.png'), fullscreenable: false, resizable: false, frame: false, autoHideMenuBar: true, backgroundColor: "#141518" });
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views', 'login.html'),
    protocol: 'file:',
    slashes: true
  }));

  globalShortcut.register('Alt+Q', () => {

    app.quit();

  });

  globalShortcut.register('Alt+W', () => {

    win.webContents.openDevTools({ mode: "undocked" });

  });

  globalShortcut.register('Alt+E', () => {


    win.webContents.closeDevTools();

  });

  ipcMain.on('didMount', (event, arg) => {

    win.show();

  });
  
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}





ipcMain.on('login', (event, arg) => {

  authLogin(event, win);


});

ipcMain.on('close', (event, arg) => {

  win.close();

});


ipcMain.on('minimize', (event, arg) => {

  win.minimize();

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
