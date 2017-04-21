const React = require('react');
const PropTypes = require('prop-types');

class Item extends React.Component {

    constructor(props) {
        super(props)


    }

    render() {


        var img;

        if (this.props.item.has_image === '0') {

            img = <img className="item-img" src="../images/question.jpg" alt={this.props.item.given_title} height="250" width="250" />
        } else {

            img = <img className="item-img" src={this.props.item.image.src} alt={this.props.item.given_title} height="250" width="250" />
        }


        return (<div className="item">
            <div className="item-top-toolbar">
                <h5 className="item-title">{this.props.item.given_title}</h5>
            </div>
            {img}
            <div className="item-bottom-toolbar">
                <a className="item-bottom-toolbar-button" >
                    <i className="fa fa-heart" title="Favorite"></i>
                </a>
                <a className="item-bottom-toolbar-button" >
                    <i className="fa fa-tag" title="Tag"></i>
                </a>
                <a className="item-bottom-toolbar-button" >
                    <i className="fa fa-trash-o" title="Delete"></i>
                </a>
                <a className="item-bottom-toolbar-button" >
                    <i className="fa fa-check" title="Archive"></i>
                </a>
            </div>
        </div>)


    }



}

Item.PropTypes = {

    item: PropTypes.object.isRequired

}

module.exports = Item;