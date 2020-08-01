import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import * as styles from './ValidationInputs.scss';

interface TextInputProps {
    value?: string,
    isValidInitially?: boolean,
    type?: string,
    label?: string,
    labelClassName?: string,
    inputClassName?: string,

    onChange?: (eventValue: string) => void,
    onValidityChange?: (isValid: boolean) => void
}

const TextInput: React.FC<TextInputProps> = ({ 
    value, 
    label,
    isValidInitially, 
    type, 
    labelClassName, 
    inputClassName, 
    onChange, 
    onValidityChange 
}) => {
    const [valid, setValid] = useState(isValidInitially);

    const validate = (value?: string) => {
        setValid(typeof value === 'string' && value.trim() !== '');
    }

    useEffect(() => {
        (!isValidInitially || value) && validate(value);
    }, [validate, isValidInitially, value])

    useEffect(() => {
        onValidityChange(valid);
    }, [onValidityChange, valid])

    const handleBlur: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        validate(event.target.value);
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value: eventValue } = event.target;

        onChange(eventValue);
        validate(eventValue);
    }

    const inputClasses = classNames(inputClassName, {
        [styles.inputContainer]: !inputClassName && valid,
        [styles.inputContainerInvalid]: !inputClassName && !valid
    });

    return (
        <div>
            {Boolean(label) && (
                <label className={labelClassName}>
                    <p>{label}</p>
                </label>
            )}
            <input
                type={type}
                value={value}
                className={inputClasses}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    ); 
}

TextInput.defaultProps = {
    type: 'text',

    onChange: () => {},
    onValidityChange: () => {}
}

const PasswordInput: React.FC<TextInputProps> = (props) => 
    <TextInput {...props} type="password" />;

PasswordInput.defaultProps = TextInput.defaultProps;

export default TextInput;

export {
    TextInput,
    PasswordInput
};
