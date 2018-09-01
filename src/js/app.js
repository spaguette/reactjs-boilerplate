import React from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import LoginComponent from './components/LoginComponent/LoginComponent.jsx';
import RegistrationComponent from './components/RegistrationComponent/RegistrationComponent.jsx';
import MainComponent from './components/MainComponent/MainComponent.jsx';

/**
 * RedirectFunction (ReactRouter v1.0)
 * @typedef {Function} RedirectFunction
 * @param {Object | String} LocationDescriptor
 * @return {void}
 */
/** Check the user authorization
 * @function
 * @param {Object} nextState - RouterState - created by ReactRouter
 * @param {RedirectFunction} redirectTo
 * @param {Function} callback
 * @return {void}
 * */
const requireAuth = (nextState, redirectTo, callback) => {
    axios.get('/api/session')
        .then(() => {
            setTimeout(() => {
                console.info('User authorized, page rendered');
                callback();
            }, 0);
        })
        .catch(response => {
            if (response instanceof Error) {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', response.message);
            } else {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                if (response.status === 401) {
                    console.error('User not authorized, please login');
                } else if (response.status >= 500 && response.status <= 599) {
                    console.error('Server Error!');
                } else {
                    console.error('Unhandled Error!');
                }
                redirectTo('/login');
                callback();
            }
        });
};

const loggedIn = false;

const App = () => (
    <Router>
        <MainComponent>
            <Route
                exact
                path="/"
                render={() => loggedIn ? <Redirect to="/login" /> : <Redirect to="/registration" />}
            />
            <Switch>
                <Route path="/login" component={LoginComponent} />
                <Route path="/registration" component={RegistrationComponent} />
            </Switch>
        </MainComponent>
    </Router>
);

export default hot(module)(App);