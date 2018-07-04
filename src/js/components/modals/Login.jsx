import React, { Component } from 'react';
import {
	Alert,
	Button,
	Grid,
	PageHeader,
	Panel,
	Col
} from 'react-bootstrap';
import $ from "jquery";
import { COPY } from '../../constants/COPY';
import { connect } from 'react-redux';
import { creatingLogin, clearFields, loggingIn, logIn, logOut } from '../../redux';
import Space from '../layout/Space';
import Field from '../fields/Field';
  
const mapDispatchToProps = {
    creatingLogin,
    clearFields,
    loggingIn,
    logIn,
    logOut
};

const mapStateToProps = (state, ownProps) => ({
    field: state.fieldReducer,
    login: state.loginReducer
});

class Login extends Component {
	handleLoginClick = () => {
        const { field } = this.props;

		this.validateLogin(field['username'].fieldValue, field['password'].fieldValue);
    };
    
    handleCreateLoginClick = () => {
        const { field } = this.props;

        this.createAccount(field['username'].fieldValue, field['password'].fieldValue);
    };

	validateLogin = (username, password) => {
        const { logIn, logOut } = this.props;

		$.post(COPY.URL + 'validate_login', { key: COPY.API_KEY, name: username, password: password }, (data) => {
			if (data === 'success') {
                logIn(username);
				alert('Success!');
			}
			else {
				logOut();
				alert('Failure: ' + data);
			}
		});
    };

    createAccount = (username, password) => {
        const { loggingIn, clearFields } = this.props;

        $.post(COPY.URL + 'create/user', { key: COPY.API_KEY, name: username, password: password }, (data) => {
			if (data === 'success') {
                alert('Success! User ' + username + ' created!');
                clearFields();
                loggingIn();
			}
			else {
                alert('Failure: ' + data);
                clearFields();
			}
		});
    };

    renderCreateLoginModal() {
        const { loggingIn } = this.props;

        return (
            <Panel>
				<Panel.Heading>Create account</Panel.Heading>
				<Panel.Body>
					<form>
                        <Field id='username' name='Username' placeholder="Enter Unique Username" />
                        <Field id='password' name='Password' type='password' placeholder="Enter Password" activationFunction={ this.handleClick }/>
						<Button bsStyle='success' onClick={ this.handleCreateLoginClick }>Create Account</Button>
                        <Space height='15px'/>
                        <Button bsSize="xsmall" onClick={ loggingIn }>
                            log in
                        </Button>
					</form>
				</Panel.Body>
			</Panel>
        );
    }
    
    renderLoginModal() {
        const { creatingLogin } = this.props;

        return (
            <Panel>
				<Panel.Heading>Login</Panel.Heading>
				<Panel.Body>
					<form>
                        <Field id='username' name='Username' placeholder="Enter Username" />
                        <Field id='password' name='Password' type='password' placeholder="Enter Password" activationFunction={ this.handleLoginClick }/>
						<Button bsStyle='success' onClick={ this.handleLoginClick }>Login</Button>
                        <Space height='15px'/>
                        <Button bsSize="xsmall" onClick={ creatingLogin }>
                            create account
                        </Button>
					</form>
				</Panel.Body>
			</Panel>
        );
    }

  	render() {
        const { login } = this.props;
        const { creatingAccount } = login;

    	return (
			<div className="App">
                <PageHeader>
  					Welcome to Broken Crap!
				</PageHeader>
				<Alert bsStyle="warning">
  					<strong>This site is under construction!</strong>
				</Alert>
                <Space />
				<Grid>
				    <Col xs={4} xsOffset={4}>
                        { !creatingAccount ? this.renderLoginModal() : this.renderCreateLoginModal() }
				    </Col>
			    </Grid>
    		</div>
    	);
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);