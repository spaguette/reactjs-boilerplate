import React, { useState, useEffect, useCallback } from 'react';
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

export const TextInput: React.FC<TextInputProps> = ({
    value,
    label,
    isValidInitially = false,
    type = 'text',
    labelClassName,
    inputClassName,
    onChange = () => { },
    onValidityChange = () => { }
}) => {
    const [valid, setValid] = useState(isValidInitially);

    const validate = useCallback((value?: string) => {
        setValid(typeof value === 'string' && value.trim() !== '');
    }, [])

    useEffect(() => {
        (!isValidInitially || value) && validate(value);
    }, [validate, isValidInitially, value])

    useEffect(() => {
        onValidityChange(valid);
    }, [onValidityChange, valid])

    const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        validate(event.target.value);
    }, [validate])

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const { value: eventValue } = event.target;

        onChange(eventValue);
        validate(eventValue);
    }, [onChange, validate])

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
    )
}

export const PasswordInput: React.FC<TextInputProps> = (props) =>
    <TextInput {...props} type="password" />