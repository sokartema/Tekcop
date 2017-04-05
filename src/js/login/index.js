const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jQuery');
const {ipcRenderer} = require('electron');

const RegisterView = require('./register-view');

const newRegister = {

  email: "",
  name: "",
  surname: "",
  password: "",
  confirmPassword: ""
}

ReactDOM.render(<RegisterView newRegister={newRegister}/>, document.getElementById('react-form'));

$('#alert').click(() => {

  ipcRenderer.send('canal1', 'hey');

});