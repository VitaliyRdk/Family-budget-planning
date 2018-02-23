import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

class Hello extends Component {
    render() {
        return(
            <div id="hello" className="well">
              <p>Hello. This site will help you to calculate your family budget and structure your expenses.</p> 
              <p>Click "Sign in" to continue working with the site.</p> 
              <Link to="/public/signin" className="btn btn-success">Sign in</Link>
            </div>
        )
    }
}

export default Hello;