import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as history from './../../../index';

/*Actions*/
import * as AuthorizationAction from './../../../actions/authorizationAction';

class Menu extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      logout(){
        AuthorizationAction.logout();
        history.history.push('/');
      }

    render() {
        return(
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Logo</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <div style={{'float': 'right', 'margin': '7px'}}>
                           <Button bsStyle="danger" onClick={this.logout.bind(this)}>Logout</Button>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect(store => ({ store }))(Menu);