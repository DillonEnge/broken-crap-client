import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Navbar, Button } from 'react-bootstrap';
import { logOut } from '../redux';
import Listing from './modals/Listing';

const mapStateToProps = (state, ownProps) => ({
    login: state.loginReducer,
});
  
const mapDispatchToProps = {
    logOut
};

class MainApp extends Component {
    renderNavBar() {
        const { login, logOut } = this.props;
        const { username } = login;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="">brokencrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullLeft>
                        <NavItem>
                            Listings
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            { 'Signed in as: ' + username }
                        </NavItem>
                        <NavItem>
                            <div onClick={ logOut }>Log Out</div>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    renderListings() {
        return (
            <Listing />
        )
    }

    render() {
        return (
            <div>
                { this.renderNavBar() }
                { this.renderListings() }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);