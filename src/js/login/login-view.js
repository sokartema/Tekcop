const React = require('react');

const { ipcRenderer } = nodeRequire('electron');

const ErrorMessage = require('./error-message');

class LoginView extends React.Component {

    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);

        this.state = { isLoginIn: false , error:{hasError: false, reason: ""}};

    }

    onLogin() {


        this.setState({ isLoginIn: true, error:{hasError: false, reason: ""} });
        ipcRenderer.send('login', 'login');

        ipcRenderer.on('error', (event, arg) => {
            this.setState({isLoginIn: false, error:{hasError: true, reason: arg}});
        });

    }

    componentDidMount() {

        ipcRenderer.send('didMount', 'mounted');
    }

    render() {

        const buttonContent = this.state.isLoginIn ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "Login with Pocket";

        return (
            <div className="col-md-4">
                <button className="btn custom" onClick={this.onLogin} > {buttonContent} </button>
                 <ErrorMessage error={this.state.error}/>
            </div>
        )

    }



}

module.exports = LoginView;