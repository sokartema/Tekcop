const React = require('react');
const ReactDOM = require('react-dom');
const {ipcRenderer} = nodeRequire('electron');


const MainContainer = require('./main-container');


ReactDOM.render(<MainContainer indexMenu={0} />, document.getElementById('react-main'));



$('#close').click(()=>{

    ipcRenderer.send('close-main', 'close');

});

$('#maximize').click(()=>{

    ipcRenderer.send('maximize-main', 'maximize');

});


$('#minimize').click(()=>{

    ipcRenderer.send('minimize-main', 'minimize');

});

ipcRenderer.send('getUserName', 'getUserName');


ipcRenderer.on('getUserName-reply', (event, arg) => {
    $('#username').text(arg);
});

