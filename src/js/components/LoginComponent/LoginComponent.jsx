import React, { useState } from 'react';

import * as styles from './LoginComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';

const LoginComponent = ({ history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLoginClick = () => {
        SessionActions.logIn({ username, password }, history);
    }

    const handleRegistrationClick = () => {
        history.push('/registration');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLoginClick();
        }
    }

    return (
        <div
            className={styles.loginForm}
            onKeyDown={handleKeyDown}
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
                    onChange={handleUsernameChange}
                    value={username}
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
                    onChange={handlePasswordChange}
                    value={password}
                />
            </div>
            <div
                className={styles.loginButton}
                onClick={handleLoginClick}
            >
                Sign in
            </div>
            <div
                className={styles.registrationButtonLink}
                onClick={handleRegistrationClick}
            >
                Sign up
            </div>
        </div>
    );
}

export default LoginComponent;
