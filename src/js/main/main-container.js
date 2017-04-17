const React = require('react');
const { ipcRenderer } = nodeRequire('electron');
const PropTypes = require('prop-types');
const HomeMenu = require('./home-menu');



class MainContainer extends React.Component {

    constructor(props) {

        super(props);


        this.state = { indexMenu: props.indexMenu }

    }


    componentDidMount() {

        var self = this;

        $('.side-menu-button').each(function (index, element) {

            $(element).click(function () {

                $('.side-menu-button.selected').removeClass('selected');

                $(this).addClass('selected');

                self.setState({ indexMenu: index });


            });

        })


        ipcRenderer.send('didMount-main', 'mounted');



    }


    render() {

        let menu;

        switch(this.state.indexMenu){

            case 0:
                menu = <HomeMenu />
                break;
            case 1:
                menu = null;
                break;
            case 2:
                menu = null;
                break;
            case 3:
                menu = null;   
                break;         


        }


        return (menu)

    }




}


MainContainer.PropTypes = {

    indexMenu: PropTypes.number.isRequired
}


module.exports = MainContainer;
