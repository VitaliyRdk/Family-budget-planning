import React, { Component } from 'react';
import { Button, FormGroup, FormControl,ControlLabel } from 'react-bootstrap';
import * as history from './../../../../index';
/*Helpers*/
import * as notify from './../../../../helpers/notificationHelper';
/*Actions*/
import * as AuthorizationAction from './../../../../actions/authorizationAction';
import './style.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            }
        }
    }

    onChangeValue = (value, props) => {
        // this.setState((value, prop) => {
        //     return {user: [prop] = value};
        //   });
        this.state.user[props] = value;
        this.setState(this.state);
    };

    onLogin(){
        AuthorizationAction.login(this.state.user.email, this.state.user.password).then(ok=>{
            notify.success('Authorized');
            history.history.push('/cabinet/operations');
        }, error=>{
            notify.error('Invalid data. Check the entered login and login password');
        });
    }

    render() {
        return(
           <div className="well"  id="info-forms" >
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="email" name="email" onChange={e=> this.onChangeValue(e.target.value,'email')} placeholder="Enter your email" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" name="password" onChange={e=> this.onChangeValue(e.target.value,'password')} placeholder="Enter your password" />
                </FormGroup>
                <Button id='btn' onClick={this.onLogin.bind(this)}>Login</Button>
            </div>
        )
    }
}

export default Login;