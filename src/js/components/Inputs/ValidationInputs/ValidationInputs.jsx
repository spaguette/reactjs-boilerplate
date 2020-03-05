import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as styles from './ValidationInputs.scss';

const TextInput = ({ 
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

    const validate = (value) => {
        setValid(typeof value === 'string' && value.trim() !== '');
    }

    useEffect(() => {
        (!isValidInitially || value) && validate(value);
    }, [isValidInitially, value])

    useEffect(() => {
        onValidityChange(valid);
    }, [valid])

    const handleBlur = (event) => {
        validate(event.target.value);
    }

    const handleChange = (event) => {
        const { value } = event.target;

        onChange(value);
        validate(value);
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

TextInput.propTypes = {
    value: PropTypes.string,
    isValidInitially: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string,

    onChange: PropTypes.func.isRequired,
    onValidityChange: PropTypes.func.isRequired
}

TextInput.defaultProps = {
    type: 'text',

    onChange: () => {},
    onValidityChange: () => {}
}

const PasswordInput = memo(props => <TextInput {...props} type="password" />);

PasswordInput.propTypes = TextInput.propTypes;
PasswordInput.defaultProps = TextInput.defaultProps;

export default TextInput;

export {
    TextInput,
    PasswordInput
};
