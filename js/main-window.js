const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const Q = require('q');
const path = require('path');
const url = require('url');
const keytar = require('keytar');
const getItems = require('./get-items');
const keySorter = require('./key-sorter');


let win;

function mainWindow(parentWin) {

    const width = 1200;
    const height = 800;

    win = new BrowserWindow({ width: width, height: height, title: "Tekcop", show: true, icon: path.join(__dirname, '..', 'images', 'logo2.png'), frame: false, autoHideMenuBar: true, backgroundColor: "#141518" });

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


        getItems(arg).then((success) => {

            let arr = keySorter(Object.values(success.list));
            console.log(arr);
            event.sender.send('getItems-reply', arr);

        }).catch((reason) => {

            console.log(reason);
        });

    });

    ipcMain.on('getScreenDimensions', (event, arg) => {

        let dimensions = {width: width, height: height};

        event.sender.send('getScreenDimensions-reply', dimensions);


    });

    ipcMain.on('getUserName', (event, arg) => {


        keytar.getPassword("Tekcop", "username").then((success) => {

            console.log(success);
            event.sender.send('getUserName-reply', success);


        }).catch((reason) => {

            console.log(reason);

        })

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