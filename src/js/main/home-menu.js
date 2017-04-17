const React = require('react');

const Item = require('./item');

const { ipcRenderer } = nodeRequire('electron');


class HomeMenu extends React.Component{

    constructor(props){
        super(props)

    }       

    componentDidMount(){


        ipcRenderer.send('getItems', 5);

    }                             


    render(){

        return (<Item />)

    }

}


module.exports = HomeMenu;