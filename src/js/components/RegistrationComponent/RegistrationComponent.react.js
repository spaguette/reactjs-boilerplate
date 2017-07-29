import React from 'react';
import * as styles from './RegistrationComponent.scss';
import {browserHistory} from 'react-router';
import SessionActions from '../../reflux/actions/SessionActions';
import {TextInput, PasswordInput} from '../Inputs/ValidationInputs/ValidationInputs.react';

class RegistrationComponent extends React.PureComponent {
    static displayName = 'RegistrationComponent';

    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoginEmpty: null,
            isPasswordEmpty: null,
            isLicenseEmpty: null
        };
    }

    validate = (name, event) => {
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
    };

    register = () => {
        const loginValue = this.refs.loginInput.refs.input.value,
            passwordValue = this.refs.passwordInput.refs.input.value,
            licensePlateValue = this.refs.licensePlateInput.refs.input.value;
        let isLoginEmpty = false, isPasswordEmpty = false, isLicenseEmpty = false;

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
            });
        } else {
            console.error('Please fill all fields to register');
            this.setState({isLoginEmpty, isPasswordEmpty, isLicenseEmpty});
        }
    };

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.register();
        }
    };

    render() {
        const {router} = this.context;
        const {isLoginEmpty, isPasswordEmpty, isLicenseEmpty} = this.state;
        return (
            <div onKeyDown={this.onKeyDown}>
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
                <div className={styles.registrationButton} onClick={this.register}>
                    Sign up
                </div>
                <div className={styles.loginButtonLink} onClick={() => {
                    browserHistory.push('/login');
                }}
                >
                    Sign in
                </div>
            </div>
        );
    }
}

export default RegistrationComponent;