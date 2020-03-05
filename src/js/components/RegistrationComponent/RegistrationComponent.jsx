import React, { useState } from 'react';

import * as styles from './RegistrationComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import {TextInput, PasswordInput} from '../Inputs/ValidationInputs/ValidationInputs';

const RegistrationComponent = ({ history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [licensePlate, setLicensePlate] = useState('')

    const [isLoginValid, setIsLoginValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isLicensePlateValid, setIsLicensePlateValid] = useState(true)

    const register = () => {
        if (isLoginValid && isPasswordValid && isLicensePlateValid) {
            SessionActions.register({ username, password, licensePlate }, history);
        } else {
            console.error('Please fill all fields to register');
        }
    }

    const handleLoginClick = () => {
        history.push('/login');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            register();
        }
    }

    return (
        <div onKeyDown={handleKeyDown}>
            <TextInput
                label="Login"
                labelClassName={styles.caption}
                value={username}
                isValidInitially={isLoginValid}
                onChange={setUsername}
                onValidityChange={setIsLoginValid}
            />
            <PasswordInput
                label="Password"
                labelClassName={styles.caption}
                value={password}
                isValidInitially={isPasswordValid}
                onChange={setPassword}
                onValidityChange={setIsPasswordValid}
            />
            <TextInput
                label="Registration number"
                labelClassName={styles.caption}
                value={licensePlate}
                isValidInitially={isLicensePlateValid}
                onChange={setLicensePlate}
                onValidityChange={setIsLicensePlateValid}
            />
            <div
                className={styles.registrationButton}
                onClick={register}
            >
                Sign up
            </div>
            <div
                className={styles.loginButtonLink}
                onClick={handleLoginClick}
            >
                Sign in
            </div>
        </div>
    );
}

export default RegistrationComponent;