const React = require('react');

const RegisterForm = require('./register-form');
const RegisterError = require('./register-error');
const $ = require('jQuery');



class RegisterView extends React.Component{

  constructor(props){

    super(props);
    this.state = {ErrorMessage: ""}
    this.onNewSubmit = this.onNewSubmit.bind(this);

  }

  onNewSubmit(state){
    let obj = {};
    obj.email = state.email;
    obj.name = state.name;
    obj.surname = state.surname;
    obj.password = state.password;

    var self = this;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://www.quepo.es/register",
        data: obj,
        success: function(e) {
            if (e.id === 2) {

              self.setState({ErrorMessage: "Este usuario ya ha sido registrado"});

            } else if(e.id ===3){

              self.setState({ErrorMessage: "El servicio de registro no esta disponible ahora mismo"});

            }else if (e.id === 0) {
                window.location = 'https://www.quepo.es/registerComplete';
            }
        },
        error: function(e) {

          self.setState({ErrorMessage: "Error del servidor intentelo mas tarde"});
        }
    });

  }

  render(){


    return(
      <div className="col-md-4">
        <RegisterError message={this.state.ErrorMessage} />
        <RegisterForm newRegister={this.props.newRegister} onNewSubmit={this.onNewSubmit}/>
      </div>
    )

  }

}

RegisterView.PropTypes = {

  newRegister: React.PropTypes.object.isRequired

};

module.exports = RegisterView;
