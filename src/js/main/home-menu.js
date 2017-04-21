const React = require('react');

const Item = require('./item');

const { ipcRenderer } = nodeRequire('electron');


class HomeMenu extends React.Component {

    constructor(props) {
        super(props)

        this.state = { items: [] };

    }

    componentDidMount() {

        var self = this;

        $(window).resize(() => {
            $('#loader').height($(window).height() - 50);
            $('#item-container').height($(window).height() - 150);
        });


        ipcRenderer.send('getScreenDimensions', 'getScreenDimensions');

        ipcRenderer.on('getScreenDimensions-reply', (event, arg) => {

            $('#loader').height($(window).height() - 50);
            $('#item-container').height(arg.height-150);

        });

        ipcRenderer.send('getItems', 6);

        ipcRenderer.on('getItems-reply', (event, arg) => {

            self.setState({ items: arg });

            //$('#loader').css('display', 'none');
            //$('#react-main').css('display', 'initial')
           

        });

       

    }

    componentDidUpdate(prevProps, prevState){

         $(".nano").nanoScroller();
    }


    render() {

        const items = this.state.items.map((val, index, array) => {

            return (<Item key={val.key} item={val} />)
        })


        return (
            <div>
                <div className="home-top-toolbar">
                    <h1 className="title"> My list </h1>
                </div>
                <div id="item-container"  className="nano container home-item-container full-width ">
                    <div  className="nano-content">
                        {items}
                    </div>
                </div>
            </div>)

    }

}


module.exports = HomeMenu;