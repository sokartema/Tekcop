const React = require('react');

class MainContainer extends React.Component{

    constructor(props){

        super(props);

        
    }


    render(){

        


        return(<p>{this.props.indexMenu}</p>)

    }


}


MainContainer.PropTypes = {

    indexMenu: React.PropTypes.number.isRequired
}


module.exports = MainContainer;
