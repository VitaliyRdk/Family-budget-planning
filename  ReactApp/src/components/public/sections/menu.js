import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import * as history from './../../../index';
import config from './../../../api/config';

/*Actions*/
import * as AuthorizationAction from './../../../actions/authorizationAction';

class Menu extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    signOut(){
        config.delToken();
        history.history.push('/');
    }

    isAuthorize(){
        return AuthorizationAction.IsExistToken();

    }

    render() {

        return(
            <div id="menu">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="nav-link" to="/">Home page</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        )
    }
}

export default connect(store => ({ store }))(Menu);