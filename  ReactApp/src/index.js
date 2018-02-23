import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { NotificationContainer } from 'react-notifications';



import reducer from './reducers/reducer';

import PublicPage from './components/public/publicPage';
import CabinetPage from './components/cabinet/cabinetPage';

import './index.css';
import 'react-notifications/lib/notifications.css';

import registerServiceWorker from './registerServiceWorker';


export const history = createHistory();
const routerMW = routerMiddleware(history);
export const store = createStore(reducer,applyMiddleware(routerMW, thunk));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <NotificationContainer/>
                <Route path="/public" component={PublicPage}/>
                <Route path="/cabinet" component={CabinetPage}/>
                <Route exact path="/" render={() => (<Redirect to="/public" />)} /> 
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
