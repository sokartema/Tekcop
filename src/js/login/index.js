const React = require('react');
const ReactDOM = require('react-dom');
const {ipcRenderer} = nodeRequire('electron');

const LoginView = require('./login-view');

ReactDOM.render(<LoginView/> , document.getElementById('react-login'));

$('#close').click(()=>{

    ipcRenderer.send('close', 'close');

});

$('#minimize').click(()=>{

    ipcRenderer.send('minimize', 'minimize');

});