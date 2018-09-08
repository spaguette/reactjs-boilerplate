import React, { createRef, PureComponent } from 'react';
import autobind from 'autobind-decorator';

import styles from './Dropdown.scss';
import dropdownCheck from '../../../utils/dropdownCheck';

class Dropdown extends PureComponent {
    dropDownContentRef = createRef()

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
        dropdownCheck(event, () => {this.handleDropdownClick(event);}, [this.dropDownContentRef]);
    }

    render() {
        let content = null;

        if (this.state.isOpened) {
            content = (
                <div
                    ref={this.dropDownContentRef}
                    className={styles.innerContent}
                >
                    This is a test Dropdown component!
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <div
                    onClick={this.handleDropdownClick}
                    className={styles.caption}
                >
                    Click me!
                </div>
                {content}
            </div>
        );
    }
}

export default Dropdown;