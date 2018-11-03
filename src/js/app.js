import React, { lazy, Suspense, Component } from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import outsideClick from './utils/dropdownCheck';
const LoginComponent = lazy(() => import('./components/LoginComponent/LoginComponent.jsx'));
const RegistrationComponent = lazy(() => import('./components/RegistrationComponent/RegistrationComponent.jsx')) ;
import MainComponent from './components/MainComponent/MainComponent.jsx';

/**
 * RedirectFunction (ReactRouter v1.0)
 * @typedef {Function} RedirectFunction
 * @param {Object | String} LocationDescriptor
 * @return {void}
 */
/** Check the user authorization
 * @function
 * @async
 * @param {Object} nextState - RouterState - created by ReactRouter
 * @param {RedirectFunction} redirectTo
 * @param {Function} callback
 * @return {void}
 * */
async function requireAuth(nextState, redirectTo, callback) {
    try {
        await axios.get('/api/session');

        setTimeout(() => {
            console.info('User authorized, page rendered');
            callback();
        }, 0);
    } catch(err) {
        if (err instanceof Error) {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', err.message);
        } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            if (err.status === 401) {
                console.error('User not authorized, please login');
            } else if (err.status >= 500 && err.status <= 599) {
                console.error('Server Error!');
            } else {
                console.error('Unhandled Error!');
            }
            redirectTo('/login');
            callback();
        }
    }
}

const loggedIn = false;

@hot(module)
class App extends Component {
    componentDidMount() {
        outsideClick.initialize();
    }

    componentWillUnmount() {
        outsideClick.destroy();
    }

    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainComponent>
                        <Route
                            exact
                            path="/"
                            render={() => loggedIn ? <Redirect to="/login" /> : <Redirect to="/registration" />}
                        />
                        <Switch>
                            <Route
                                path="/login"
                                component={LoginComponent}
                            />
                            <Route
                                path="/registration"
                                component={RegistrationComponent}
                            />
                        </Switch>
                    </MainComponent>
                </Suspense>
            </Router>
        );
    }
}

export default App;