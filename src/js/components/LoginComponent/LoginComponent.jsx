import React, { PureComponent } from 'react';

import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';

class LoginComponent extends PureComponent {
    state = {
        username: '',
        password: ''
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }


    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }


    handleLoginClick = () => {
        const { username, password } = this.state;

        SessionActions.logIn({ username, password }, this.props.history);
    }


    handleRegistrationClick = () => {
        this.props.history.push('/registration');
    }


    handleKeyDown = (event) => {
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
                        id="login-username-input-field"
                        type="text"
                        className={styles.formInput}
                        onChange={this.handleUsernameChange}
                        value={this.state.username}
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
                        id="login-password-input-field"
                        type="password"
                        className={styles.formInput}
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
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
