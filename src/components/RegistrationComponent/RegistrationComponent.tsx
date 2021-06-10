import React, { useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router'

import * as styles from './RegistrationComponent.scss';
import SessionActions from '../../reflux/actions/SessionActions';
import { TextInput, PasswordInput } from '../Inputs/ValidationInputs/ValidationInputs';

type RegistrationComponentProps = RouteComponentProps

const RegistrationComponent: React.FC<RegistrationComponentProps> = ({ history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [licensePlate, setLicensePlate] = useState('')

    const [isLoginValid, setIsLoginValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isLicensePlateValid, setIsLicensePlateValid] = useState(true)

    const register = useCallback(() => {
        if (isLoginValid && isPasswordValid && isLicensePlateValid) {
            SessionActions.register({ username, password, licensePlate }, history);
        } else {
            console.error('Please fill all fields to register');
        }
    }, [isLoginValid, isPasswordValid, isLicensePlateValid, username, password, licensePlate, history])

    const handleLoginClick: React.MouseEventHandler = useCallback(() => {
        history.push('/login');
    }, [history])

    const handleKeyDown: React.KeyboardEventHandler = useCallback((event) => {
        if (event.key === 'Enter') {
            register();
        }
    }, [register])

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