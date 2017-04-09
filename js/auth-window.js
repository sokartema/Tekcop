const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const request = require('request');
const Q = require('q');

let log;

const loginConfig = require('../config/login.json');

function authLogin(event, win) {

  log = new BrowserWindow({ width: 600, height: 600, parent: win, show: false, webPreferences: { webSecurity: false, nodeIntegration: false } });

  let data = {
    "consumer_key": loginConfig.consumer_key,
    "redirect_uri": loginConfig.redirect_uri
  };

  let code;

  let token;
  let username;

  (function () {

    var d = Q.defer();

    request.post({ url: 'https://getpocket.com/v3/oauth/request', form: data }, function (err, httpResponse, body) {

      if (!err) {
        var arr = body.split('=');

        code = arr[1];

        console.log(code);

        d.resolve();

      } else {

        d.reject(err);
      }

    });

    return d.promise;

  })().then(() => {

    var d = Q.defer();

    console.log("paso2");

    let url = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${loginConfig.redirect_uri}`;

    log.loadURL(url);

    log.webContents.on('did-get-response-details', (event, status, newURL, originalURL, httpResponseCode, requestMethod, referrer, headers) => {

      if (newURL.trim() === url) {

        log.show();

      }

    });


    log.webContents.on('will-navigate', (event, url) => {

      if (url.trim() === "http://localhost") {
        d.resolve();

      } 

    });

    log.webContents.on('did-get-redirect-request', (event, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, referrer, headers) => {

      if (newURL.trim() === "http://localhost/") {

        d.resolve();

      } 

    });


    return d.promise;


  }).then(() => {

    var d = Q.defer();

    log.close();

    d.resolve();

    return d.promise;

  }).then(() => {

    var d = Q.defer();

    let data2 = {

      "consumer_key": loginConfig.consumer_key,
      "code": code

    }

    request.post({ url: 'https://getpocket.com/v3/oauth/authorize', form: data2 }, function (err, httpResponse, body) {

      if (!err) {

        var arr = body.split('&')[0].split('=');
        var arr2 = body.split('&')[1].split('=')

        token = arr[1];
        username = arr2[1];

        console.log(token);
        console.log(username);



        d.resolve();

      } else {

        d.reject(err);
      }

    });

    return d.promise;


  }).then(() => {

    var d = Q.defer();

    const cookie = { url: 'https://getpocket.com/', username: username, token: token }
    session.defaultSession.cookies.set(cookie, (error) => {
      if (error){
        console.error(error);
      }else{
        d.resolve();
      }
    });

    return d.promise;

  }).then(()=>{

    var d = Q.defer();

    event.sender.send('asynchronous-reply', 'pong');
    return d.promise;



  }).catch((reason) => {

    event.sender.send('error', reason);
    console.log(reason);
    log.close();

  }).done();


   log.on('closed', () => {
  
    log = null;
    
  });


}

module.exports = authLogin;