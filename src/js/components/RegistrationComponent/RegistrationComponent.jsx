import React, { PureComponent } from 'react';

import * as styles from './RegistrationComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import {TextInput, PasswordInput} from '../Inputs/ValidationInputs/ValidationInputs';

class RegistrationComponent extends PureComponent {
    isLoginValid = true
    isPasswordValid = true
    isLicensePlateValid = true

    state = {
        username: '',
        password: '',
        licensePlate: '',
    }

    handleFieldChange = field => value => {
        this.setState({ [field]: value });
    }

    handleValidityChange = validityProperty => isValid => {
        this[validityProperty] = isValid;
    }

    register = () => {
        const { username, password, licensePlate } = this.state;

        if (this.isLoginValid && this.isPasswordValid && this.isLicensePlateValid) {
            SessionActions.register({ username, password, licensePlate }, this.props.history);
        } else {
            console.error('Please fill all fields to register');
        }
    }

    handleLoginClick = () => {
        this.props.history.push('/login');
    }

    handleKeyDown = (event) => {
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
                    value={this.state.username}
                    isValidInitially={this.isLoginValid}
                    onChange={this.handleFieldChange('username')}
                    onValidityChange={this.handleValidityChange('isLoginValid')}
                />
                <PasswordInput
                    label="Password"
                    labelClassName={styles.caption}
                    value={this.state.password}
                    isValidInitially={this.isPasswordValid}
                    onChange={this.handleFieldChange('password')}
                    onValidityChange={this.handleValidityChange('isPasswordValid')}
                />
                <TextInput
                    label="Registration number"
                    labelClassName={styles.caption}
                    value={this.state.licensePlate}
                    isValidInitially={this.isLicensePlateValid}
                    onChange={this.handleFieldChange('licensePlate')}
                    onValidityChange={this.handleValidityChange('isLicensePlateValid')}
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