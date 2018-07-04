import React, { Component } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import Login from './components/modals/Login';
import MainApp from './components/MainApp'

const mapStateToProps = (state, ownProps) => ({
    login: state.loginReducer,
});

class App extends Component {
  	render() {
		const { login } = this.props;
		const { loggedIn } = login;

    	return (
			<div className="App">
				{ !loggedIn ? <Login /> : <MainApp />}
    		</div>
    	);
  	}
}

export default connect(mapStateToProps)(App);
