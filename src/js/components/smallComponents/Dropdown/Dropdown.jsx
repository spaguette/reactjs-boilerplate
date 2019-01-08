import React, { memo, Component, forwardRef, createRef } from 'react';
import autobind from 'autobind-decorator';

import styles from './Dropdown.scss';
import outsideClick from '../../../utils/dropdownCheck';

const withForwardedRef = WrappedComponent => forwardRef((props, ref) => (
    <WrappedComponent
        {...props}
        ref={props.instanceRef}
        forwardedRef={ref}
    />
));

const withOutsideClickHandler = WrappedComponent => {
    const WithForwardedRef = withForwardedRef(WrappedComponent);

    class WithOutsideClickHandler extends Component {
        instanceRef = createRef()
        dropDownContentRef = createRef()

        state = { isOpened: false }

        componentDidUpdate(prevProps, prevState) {
            if (prevState.isOpened !== this.state.isOpened) {
                const element = this.dropDownContentRef.current;

                this.state.isOpened ? outsideClick.set(element, this.handleClickOutside) : outsideClick.delete(element);
            }
        }

        @autobind
        toggleDropdown(event, newIsOpened = null) {
            this.setState(prevState => ({
                isOpened: newIsOpened === null ? !prevState.isOpened : newIsOpened
            }));
        }

        @autobind
        handleClickOutside() {
            this.toggleDropdown(null, false);

            const instance = this.instanceRef.current;

            if (instance && typeof instance.handleClickOutside === 'function') {
                instance.handleClickOutside(event);
            }
        }

        render() {
            return (
                <WithForwardedRef
                    {...this.props}
                    ref={this.dropDownContentRef}
                    instanceRef={this.instanceRef}
                    isOpened={this.state.isOpened}
                    onOutsideClick={this.handleClickOutside}
                    toggleDropdown={this.toggleDropdown}
                />
            )
        }
    }

    return WithOutsideClickHandler;
};

const DropdownRoot = memo(({ onClick }) => <div className={styles.caption} onClick={onClick}>Click me!</div>);
const DropdownContent = memo(() => <div className={styles.innerContent}>This is a test Dropdown component!</div>);

const Dropdown = memo(({ forwardedRef, isOpened, toggleDropdown }) => (
    <div className={styles.container} ref={forwardedRef}>
        <DropdownRoot onClick={toggleDropdown} />
        {isOpened && <DropdownContent />}
    </div>
));

export default withOutsideClickHandler(Dropdown);