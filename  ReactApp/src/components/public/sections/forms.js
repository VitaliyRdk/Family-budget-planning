import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

/*Forms*/
import Login from './forms/login';
import Registration from './forms/registration';

class AuthorizationForm extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render() {
        return(
        <div id="authorization-form">
            <Tabs activeKey={this.state.activeTab} onSelect={this.toggle.bind(this)} id="controlled-tab-example">
                <Tab eventKey={1} title="Login"><Login/></Tab>
                <Tab eventKey={2} title="Registration"><Registration/></Tab>
            </Tabs>
        </div>
        )
    }
}

export default AuthorizationForm;