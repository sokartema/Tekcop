const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const request = require('request');
const Q = require('q');
const path = require('path');
const url = require('url');

let win;

function mainWindow(parentWin) {


    win = new BrowserWindow({ width: 800, height: 600, title: "Tekcop", show: true, icon: path.join(__dirname, '..', 'images', 'logo2.png'), frame: false, autoHideMenuBar: true, backgroundColor: "#141518" });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools({ mode: "undocked" });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    parentWin.close();

    ipcMain.on('close-main', (event, arg) => {

        win.close();

    });


    ipcMain.on('minimize-main', (event, arg) => {

        win.minimize();

    });

     ipcMain.on('maximize-main', (event, arg) => {

        if(win.isMaximized()){
            win.unmaximize();
        }else{
            win.maximize();

        }

    });

}


module.exports = mainWindow;