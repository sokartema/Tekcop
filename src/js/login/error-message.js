const React = require('react');

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

    error: React.PropTypes.object.isRequired

}

module.exports = ErrorMessage;