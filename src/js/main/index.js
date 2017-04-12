const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jQuery');
const {ipcRenderer} = require('electron');


const MainContainer = require('./main-container');


function changeMenu(index){

    ReactDOM.render(<MainContainer indexMenu={index} />, document.getElementById('react-main'));

}

changeMenu(0);


$('#close').click(()=>{

    ipcRenderer.send('close-main', 'close');

});

$('#maximize').click(()=>{

    ipcRenderer.send('maximize-main', 'maximize');

});


$('#minimize').click(()=>{

    ipcRenderer.send('minimize-main', 'minimize');

});


var arr = $('.side-menu-button');



arr.each(function(index, element){

    $(element).click(function(){

        $('.side-menu-button.selected').removeClass('selected');

        $(element).addClass('selected');

        changeMenu(index);


    });

})