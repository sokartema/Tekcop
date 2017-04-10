const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jQuery');
const {ipcRenderer} = require('electron');


$('#close').click(()=>{

    ipcRenderer.send('close-main', 'close');

});

$('#maximize').click(()=>{

    ipcRenderer.send('maximize-main', 'maximize');

});


$('#minimize').click(()=>{

    ipcRenderer.send('minimize-main', 'minimize');

});