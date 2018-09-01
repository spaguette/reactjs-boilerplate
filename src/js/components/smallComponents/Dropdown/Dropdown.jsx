import React from 'react';
import autobind from 'autobind-decorator';

import styles from './Dropdown.scss';
import dropdownCheck from '../../../utils/dropdownCheck';

class Dropdown extends React.PureComponent {
    dropDownButtonRef = React.createRef()

    state = {
        isOpened: false
    }

    mountEvents() {
        document.addEventListener('click', this.handleOutsideAreaClick);
    }

    unMountEvents() {
        document.removeEventListener('click', this.handleOutsideAreaClick);
    }

    @autobind
    handleDropdownClick(event) {
        event.stopPropagation();
        this.state.isOpened ? this.unMountEvents() : this.mountEvents();
        this.setState(prevState => ({ isOpened: !prevState.isOpened }));
    }

    @autobind
    handleOutsideAreaClick(event) {
        dropdownCheck(event, () => {this.handleDropdownClick(event);}, [this.dropDownButtonRef]);
    }

    render() {
        let content = null;

        if (this.state.isOpened) {
            content = (
                <div
                    className={styles.innerContent}
                    ref={this.dropDownButtonRef}
                >
                    This is a test Dropdown component!
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <div onClick={this.handleDropdownClick} className={styles.caption}>Click me!</div>
                {content}
            </div>
        );
    }
}

export default Dropdown;