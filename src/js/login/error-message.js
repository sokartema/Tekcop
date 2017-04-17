const React = require('react');
const PropTypes = require('prop-types');

class ErrorMessage extends React.Component{

    constructor(props){

        super(props);

    }

    render(){

        if(!this.props.error.hasError){

            return null;
        }

        return(
            <p className="error">{this.props.error.reason}</p>
        )


    }


} 


ErrorMessage.PropTypes = {

    error: PropTypes.object.isRequired

}

module.exports = ErrorMessage;