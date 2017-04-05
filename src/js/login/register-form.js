const React = require('react');

const ErrorInputMessage = require('./error-input-message');

class RegisterForm extends React.Component{

  constructor(props){
    super(props);

    this.newObject = {}
    this.tempObject = {}

    Object.assign(this.newObject, props.newRegister , {hasError:{email: {error:false , message: ""}, name: {error:false , message: ""}, surname: {error:false , message: ""}, password: {error:false , message: ""}, confirmPassword: {error:false , message: ""}}})
    Object.assign(this.tempObject, props.newRegister)

    this.state = this.newObject;

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  onSubmit(e){
    e.preventDefault();

    if(!this.registerHasError()){

      this.props.onNewSubmit(this.state);

    }

    //this.setState(this.newObject);
  }

  onChange(e, which){

    let obj = {};
    obj[which] = e.target.value;
    this.setState(obj);
    Object.assign(this.tempObject, obj);

    switch (which){
      case 'email':
        this.emailHasError();
      break;
      case 'name':
        this.nameHasError()
      break;
      case 'surname':
        this.surnameHasError()
      break;
      case 'password':
        this.passwordHasError()
      break;
      case 'confirmPassword':
        this.confirmPasswordHasError()
      break;

    }


  }

  registerHasError(){

    if(this.state.hasError.email.error || this.state.hasError.name.error || this.state.hasError.surname.error || this.state.hasError.password.error || this.state.hasError.confirmPassword.error ){
      return true;
    }

    return false;

  }

  emailHasError(){

    if(!this.isEmail(this.tempObject.email) && this.tempObject.email.length > 0){


      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {email:{error: true, message: "El email introducido no es valido"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });


    }else if(this.tempObject.email.length > 32){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {email:{error: true, message: "El email introducido es demasiado largo"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });


    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {email:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }


  }

  nameHasError(){

    if(this.tempObject.name.length > 16){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {name:{error: true, message: "El nombre introducido es demasiado largo"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {name:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;

      });

    }
  }

  surnameHasError(){

    if(this.tempObject.surname.length > 32){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {surname:{error: true, message: "El apellido introducido es demasiado largo"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {surname:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }
  }

  passwordHasError(){

    if(this.tempObject.password.length > 16){

      this.setState((prevState, props)=>{

        let obj = {}
        let hasError = {}
        Object.assign(hasError, prevState.hasError, {password:{error: true, message: "La contraseña introducida es demasiado larga"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else if(this.tempObject.confirmPassword !== this.tempObject.password && this.tempObject.confirmPassword.length > 0){

        this.setState((prevState, props)=>{

          let hasError = {}
          let obj = {}
          Object.assign(hasError, prevState.hasError, {confirmPassword:{error: true, message: "Las contraseñas no coinciden"}});
          Object.assign(obj, prevState, {hasError: hasError});
          return obj;
        });

      }else if(this.tempObject.confirmPassword === this.tempObject.password){

        this.setState((prevState, props)=>{
          let hasError = {}
          let obj = {}
          Object.assign(hasError, prevState.hasError, {confirmPassword:{error: false, message: ""}});
          Object.assign(obj, prevState, {hasError: hasError});
          return obj;
        });

      } else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {password:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }
  }

  confirmPasswordHasError(){

    if(this.tempObject.confirmPassword.length > 16){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {confirmPassword:{error: true, message: "La contraseña introducida es demasiado larga"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else if(this.tempObject.confirmPassword !== this.tempObject.password && this.tempObject.confirmPassword.length > 0){

      this.setState((prevState, props)=>{

        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {confirmPassword:{error: true, message: "Las contraseñas no coinciden"}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    } else if(this.tempObject.confirmPassword === this.tempObject.password){

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {confirmPassword:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }else{

      this.setState((prevState, props)=>{
        let hasError = {}
        let obj = {}
        Object.assign(hasError, prevState.hasError, {confirmPassword:{error: false, message: ""}});
        Object.assign(obj, prevState, {hasError: hasError});
        return obj;
      });

    }

  }

  isEmail(email) {

      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
  }


  render(){

    let emailErrorMessage = null;
    let nameErrorMessage = null;
    let surnameErrorMessage = null;
    let passwordErrorMessage = null;
    let confirmPasswordErrorMessage = null;

    let email = <input type="email" className="form-control custom" placeholder="Email" value={this.state.email} onChange={e => {this.onChange(e, 'email')}} required/>
    let name =  <input type="text" className="form-control custom" placeholder="Nombre" value={this.state.name} onChange={e => {this.onChange(e, 'name')}} required/>
    let surname = <input type="text" className="form-control custom" placeholder="Apellidos" value={this.state.surname} onChange={e => {this.onChange(e, 'surname')}} required/>
    let password = <input type="password" className="form-control custom" placeholder="Contraseña" value={this.state.password} onChange={e => {this.onChange(e, 'password')}} required/>
    let confirmPassword = <input type="password" className="form-control custom" placeholder="Confirmar Contraseña" value={this.state.confirmPassword} onChange={e => {this.onChange(e, 'confirmPassword')}} required/>

    if(this.state.hasError.email.error){
      emailErrorMessage = <ErrorInputMessage message={this.state.hasError.email.message} />
      email = <input type="email" className="form-control customError" placeholder="Email" value={this.state.email} onChange={e => {this.onChange(e, 'email')}} required/>

    }

    if(this.state.hasError.name.error){
      nameErrorMessage = <ErrorInputMessage message={this.state.hasError.name.message} />
      name =  <input type="text" className="form-control customError" placeholder="Nombre" value={this.state.name} onChange={e => {this.onChange(e, 'name')}} required/>

    }

    if(this.state.hasError.surname.error){
      surnameErrorMessage = <ErrorInputMessage message={this.state.hasError.surname.message} />
      surname = <input type="text" className="form-control customError" placeholder="Apellidos" value={this.state.surname} onChange={e => {this.onChange(e, 'surname')}} required/>

    }

    if(this.state.hasError.password.error){
      passwordErrorMessage = <ErrorInputMessage message={this.state.hasError.password.message} />
      password = <input type="password" className="form-control customError" placeholder="Contraseña" value={this.state.password} onChange={e => {this.onChange(e, 'password')}} required/>

    }

    if(this.state.hasError.confirmPassword.error){
      confirmPasswordErrorMessage = <ErrorInputMessage message={this.state.hasError.confirmPassword.message} />
      confirmPassword = <input type="password" className="form-control customError" placeholder="Confirmar Contraseña" value={this.state.confirmPassword} onChange={e => {this.onChange(e, 'confirmPassword')}} required/>

    }

    return(
      <form className="form-horizontal custom" onSubmit={this.onSubmit}>
        <div className="form-group col-md-10">
          {email}
          {emailErrorMessage}
        </div>
        <div className="form-group col-md-10">
          {name}
          {nameErrorMessage}
        </div>
        <div className="form-group col-md-10">
          {surname}
          {surnameErrorMessage}
        </div>
        <div className="form-group col-md-10">
          {password}
          {passwordErrorMessage}
        </div>
        <div className="form-group col-md-10">
          {confirmPassword}
          {confirmPasswordErrorMessage}
        </div>
        <div className="form-group col-md-10">
          <button className="btn custom" type="submit">Crear una cuenta</button>
        </div>
      </form>
    )

  }

}

RegisterForm.PropTypes = {

  newRegister: React.PropTypes.object.isRequired,
  onNewSubmit: React.PropTypes.func.isRequired
}

module.exports = RegisterForm;
