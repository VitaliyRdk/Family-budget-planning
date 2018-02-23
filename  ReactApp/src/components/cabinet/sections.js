import React, { Component } from 'react';
import { Switch , Route , Redirect } from 'react-router';

/* Sections */
import Dashboard from './sections/dashboard';
import Operations from './sections/operations';
import Operation from './sections/operation';

class CabinetSections extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/cabinet" render={() => (<Redirect to="/cabinet/dashboard" />)} /> 
                <Route exact path="/cabinet/operation/:id?" component={Operation}/>
                <Route exact path="/cabinet/operations" component={Operations}/>
                <Route exact path="/cabinet/dashboard" component={Dashboard}/>
            </Switch> 
        );
    }
}

export default CabinetSections;