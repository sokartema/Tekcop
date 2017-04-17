const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const Q = require('q');
const path = require('path');
const url = require('url');
const getItems = require('./get-items')

let win;

function mainWindow(parentWin) {


    win = new BrowserWindow({ width: 800, height: 600, title: "Tekcop", show: true, icon: path.join(__dirname, '..', 'images', 'logo2.png'), frame: false, autoHideMenuBar: true, backgroundColor: "#141518" });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools({ mode: "undocked" });

    ipcMain.on('didMount-main', (event, arg) => {

        win.show();

    });

     ipcMain.on('getItems', (event, arg) => {

    
        getItems(arg).then((success)=>{

            console.log(Object.values(success.list));

        }).catch((reason)=>{

            console.log(reason);
        });
       
    });

    win.on('closed', () => {

        win = null;

    });

    globalShortcut.register('Alt+Q', () => {

        app.quit();

    });

    globalShortcut.register('Alt+W', () => {

        win.webContents.openDevTools({ mode: "undocked" });

    });

    globalShortcut.register('Alt+E', () => {


        win.webContents.closeDevTools();

    });


    ipcMain.on('close-main', (event, arg) => {

        win.close();

    });


    ipcMain.on('minimize-main', (event, arg) => {

        win.minimize();

    });

    ipcMain.on('maximize-main', (event, arg) => {

        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();

        }

    });

    parentWin.close();

}


module.exports = mainWindow;