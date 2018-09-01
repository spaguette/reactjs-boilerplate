import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import * as styles from './ValidationInputs.scss';

class TextInput extends React.PureComponent {
    state = {
        valid: true
    }

    static propTypes = {
        labelClassName: PropTypes.string,
        inputClassName: PropTypes.string
    }

    validate(value) {
        this.setState({valid: value && value.trim() !== ''});
    }

    @autobind
    onBlur(event) {
        this.validate(event.target.value);
    }

    render() {
        const { labelClassName, inputClassName, label } = this.props;
        let resultClassName = null;

        if (inputClassName) {
            resultClassName = inputClassName;
        } else if (this.state.valid) {
            resultClassName = styles.inputContainer;
        } else {
            resultClassName = styles.inputContainerInvalid;
        }

        return (
            <div>
                {Boolean(label) && <label className={labelClassName}><p>{label}</p></label>}
                <input
                    ref="input"
                    type="text"
                    className={resultClassName}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
}

const PasswordInput = ({ labelClassName, inputClassName, label }) => (
    <div>
        {Boolean(label) && <label className={labelClassName}><p>{label}</p></label>}
        <input
            ref="input"
            type="password"
            className={inputClassName ? inputClassName : styles.inputContainer}
        />
    </div>
);

PasswordInput.propTypes = {
    labelClassName: PropTypes.string,
    inputClassName: PropTypes.string
};

export default TextInput;

export {
    TextInput,
    PasswordInput
};
