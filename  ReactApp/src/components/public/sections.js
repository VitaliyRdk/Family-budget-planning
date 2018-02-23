import React, { Component } from 'react';
import { Switch , Route } from 'react-router';
import Forms from './sections/forms';
import Hello from './sections/hello';

class PublicSections extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/public" component={Hello}/>
                <Route path="/public/signin" component={Forms}/>
            </Switch>
        );
    }
}

export default PublicSections;
