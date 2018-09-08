import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import * as styles from './ValidationInputs.scss';

class TextInput extends PureComponent {
    state = {
        valid: this.props.isValidInitially
    }

    static propTypes = {
        value: PropTypes.string,
        isValidInitially: PropTypes.bool,
        type: PropTypes.string,
        labelClassName: PropTypes.string,
        inputClassName: PropTypes.string,

        onChange: PropTypes.func.isRequired,
        onValidityChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        type: 'text',

        onChange: () => {},
        onValidityChange: () => {}
    }

    componentDidMount() {
        (!this.props.isValidInitially || this.props.value) && this.validate(this.props.value);
    }

    componentDidUpdate(_, prevState) {
        if (prevState.valid !== this.state.valid) {
            this.props.onValidityChange(this.state.valid);
        }
    }

    validate(value) {
        this.setState({ valid: typeof value === 'string' && value.trim() !== '' });
    }

    @autobind
    handleBlur(event) {
        this.validate(event.target.value);
    }

    @autobind
    handleChange(event) {
        const { value } = event.target;

        this.props.onChange(value);
        this.validate(value);
    }

    render() {
        const { labelClassName, inputClassName, label, type, value } = this.props;

        const inputClasses = classNames(inputClassName, {
            [styles.inputContainer]: !inputClassName && this.state.valid,
            [styles.inputContainerInvalid]: !inputClassName && !this.state.valid
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
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

const PasswordInput = props => <TextInput {...props} type="password" />;

PasswordInput.propTypes = TextInput.propTypes;
PasswordInput.defaultProps = TextInput.defaultProps;

export default TextInput;

export {
    TextInput,
    PasswordInput
};
