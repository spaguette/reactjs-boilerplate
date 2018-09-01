import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';

class LoginComponent extends Component {
    @autobind
    handleLoginClick() {
        SessionActions.logIn({
            username: this.refs.loginInput.value,
            password: this.refs.passwordInput.value
        }, this.props.history);
    }

    @autobind
    handleRegistrationClick() {
        this.props.history.push('/registration');
    }

    @autobind
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.handleLoginClick();
        }
    }

    render() {
        return (
            <div
                className={styles.loginForm}
                onKeyDown={this.handleKeyDown}
            >
                <div>
                    <label
                        htmlFor="login-username-input-field"
                        className={styles.caption}
                    >
                        <p>Login</p>
                    </label>
                    <input
                        ref="loginInput"
                        id="login-username-input-field"
                        type="text"
                    />
                </div>
                <div>
                    <label
                        htmlFor="login-password-input-field"
                        className={styles.caption}
                    >
                        <p>Password</p>
                    </label>
                    <input
                        ref="passwordInput"
                        id="login-password-input-field"
                        type="password"
                    />
                </div>
                <div
                    className={styles.loginButton}
                    onClick={this.handleLoginClick}
                >
                    Sign in
                </div>
                <div
                    className={styles.registrationButtonLink}
                    onClick={this.handleRegistrationClick}
                >
                    Sign up
                </div>
            </div>
        );
    }
}

export default LoginComponent;
