import React, { Component } from 'react';
import { Button, FormGroup, FormControl,ControlLabel} from 'react-bootstrap';
/*Helpers*/
import * as notify from './../../../../helpers/notificationHelper';
/*Actions*/
import * as AuthorizationAction from './../../../../actions/authorizationAction';
import './style.css';

class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    }
    
    onChangeValue = (value, props) => {
        this.state.user[props] = value;
        this.setState(this.state); 
    };
    
    validateEmail(){
        if (this.state.user.email.indexOf('@')===-1){
            notify.error('Registration not successful. This e-mail is not valid');
        }
    }

    validateName(){
        if (this.state.user.name.length <= 2){
            notify.error('Registration not successful. This name is not valid'); 
        }
    }

    validatePassword(){
        if (this.state.user.password.length <= 5){
            notify.error('Registration not successful. This password is not valid');
        }
    }

    onRegistration(){
            AuthorizationAction.registration(this.state.user.email, this.state.user.password, this.state.user.name).then(ok=>{
                notify.success('Registration was successful');
            }, error=>{
                notify.error('Registration not successful. This login is used by another user');
            });      
    }

    render() {
        return(
            <div id="info-forms" className="well">
                 <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl type="name" name="name" onBlur={this.validateName.bind(this)} onChange={e=> this.onChangeValue(e.target.value,'name')}  placeholder="Enter your name" />
                </FormGroup>
               <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="email" name="email" onBlur={this.validateEmail.bind(this)} onChange={e=> this.onChangeValue(e.target.value,'email')} placeholder="Enter your email" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" name="password"  onBlur={this.validatePassword.bind(this)} onChange={e=> this.onChangeValue(e.target.value,'password')} placeholder="Enter your password" />
                </FormGroup>
                <Button id='btn' onClick={this.onRegistration.bind(this)}>Registration</Button>
            </div>
        )
    }
}

export default Registration;