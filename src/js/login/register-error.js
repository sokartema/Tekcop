const React = require('react');

class RegisterError extends React.Component{

  constructor(props){

    super(props);
  }

  render(){

    if(this.props.message === ""){
      return null;
    }
    return(

      <div className="alert alert-danger col-md-10">{this.props.message}</div>
    )
  }

}

RegisterError.PropTypes = {

  message: React.PropTypes.string.isRequired

}

module.exports = RegisterError;
