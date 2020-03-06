import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';

import * as styles from './ValidationInputs.scss';

const textInputPropTypes = {
    value: PropTypes.string,
    isValidInitially: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,

    onChange: PropTypes.func.isRequired,
    onValidityChange: PropTypes.func.isRequired
}

const TextInput: React.FC<InferProps<typeof textInputPropTypes>> = ({ 
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
    }, [isValidInitially, value])

    useEffect(() => {
        onValidityChange(valid);
    }, [valid])

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

TextInput.propTypes = textInputPropTypes

TextInput.defaultProps = {
    type: 'text',

    onChange: () => {},
    onValidityChange: () => {}
}

const passwordInputPropTypes = TextInput.propTypes;

const PasswordInput: React.FC<InferProps<typeof passwordInputPropTypes>> = (props) => 
    <TextInput {...props} type="password" />;

PasswordInput.propTypes = passwordInputPropTypes;
PasswordInput.defaultProps = TextInput.defaultProps;

export default TextInput;

export {
    TextInput,
    PasswordInput
};
