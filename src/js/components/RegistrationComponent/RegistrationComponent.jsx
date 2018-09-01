import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';

import * as styles from './RegistrationComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import {TextInput, PasswordInput} from '../Inputs/ValidationInputs/ValidationInputs';

class RegistrationComponent extends PureComponent {
    state = {
        isLoginEmpty: null,
        isPasswordEmpty: null,
        isLicenseEmpty: null
    }

    @autobind
    validate(name, event) {
        const value = event.target.value;
        switch (name) {
            case 'login':
                break;
            case 'password':
                break;
            case 'license':
                break;
            default:
                break;
        }
    }

    @autobind
    register() {
        const loginValue = this.refs.loginInput.refs.input.value,
            passwordValue = this.refs.passwordInput.refs.input.value,
            licensePlateValue = this.refs.licensePlateInput.refs.input.value;

        let isLoginEmpty = false,
            isPasswordEmpty = false,
            isLicenseEmpty = false;

        if (!loginValue || loginValue.trim() === '') {
            isLoginEmpty = true;
        }

        if (!passwordValue || passwordValue.trim() === '') {
            isPasswordEmpty = true;
        }

        if (!licensePlateValue || licensePlateValue.trim() === '') {
            isLicenseEmpty = true;
        }

        if (!isLoginEmpty && !isPasswordEmpty && !isLicenseEmpty) {
            SessionActions.register({
                username: this.refs.loginInput.refs.input.value,
                password: this.refs.passwordInput.refs.input.value,
                licensePlate: this.refs.licensePlateInput.refs.input.value
            }, this.props.history);
        } else {
            console.error('Please fill all fields to register');
            this.setState({isLoginEmpty, isPasswordEmpty, isLicenseEmpty});
        }
    }

    @autobind
    handleLoginClick() {
        this.props.history.push('/login');
    }

    @autobind
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.register();
        }
    }

    render() {
        return (
            <div onKeyDown={this.handleKeyDown}>
                <TextInput
                    label="Login"
                    labelClassName={styles.caption}
                    ref="loginInput"
                />
                <PasswordInput
                    label="Password"
                    labelClassName={styles.caption}
                    ref="passwordInput"
                />
                <TextInput
                    label="Registration number"
                    labelClassName={styles.caption}
                    ref="licensePlateInput"
                />
                <div
                    className={styles.registrationButton}
                    onClick={this.register}
                >
                    Sign up
                </div>
                <div
                    className={styles.loginButtonLink}
                    onClick={this.handleLoginClick}
                >
                    Sign in
                </div>
            </div>
        );
    }
}

export default RegistrationComponent;