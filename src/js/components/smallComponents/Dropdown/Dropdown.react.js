import React from 'react';
import styles from './Dropdown.scss';
import dropdownCheck from '../../../utils/dropdownCheck';

class Dropdown extends React.PureComponent {
    static displayName = 'Dropdown';

    dropDownButtonRef;

    constructor(props) {
        super(props);

        this.state = {
            isOpened: false
        };
    }

    /**
     * Subscribe to events
     * */
    mountEvents() {
        // window.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('click', this.onOutsideAreaClick);
    }

    /**
     * Unsubscribe from events
     * */
    unMountEvents() {
        // window.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('click', this.onOutsideAreaClick);
    }

    onDropdownClick = (event) => {
        event.stopPropagation();
        this.state.isOpened ? this.unMountEvents() : this.mountEvents();
        this.setState({isOpened: !this.state.isOpened});
    };

    onOutsideAreaClick = (event) => {
        dropdownCheck(event, () => {this.onDropdownClick(event);}, [this.dropDownButtonRef]);
    };

    render() {
        let content = null;
        if (this.state.isOpened) {
            content = (
                <div
                    className={styles.innerContent}
                    ref={(el) => { this.dropDownButtonRef = el; }}
                >
                    This is a test Dropdown component!
                </div>
            );
        }
        return (
            <div className={styles.container}>
                <div onClick={this.onDropdownClick} className={styles.caption}>Click me!</div>
                {content}
            </div>
        );
    }
}

export default Dropdown;