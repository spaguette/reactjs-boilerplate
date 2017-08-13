import React from 'react';
import * as styles from './MainComponent.scss';
import Dropdown from '../smallComponents/Dropdown/Dropdown.react';

class MainComponent extends React.PureComponent {
    static displayName = 'MainComponent';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.children}
                <div className={styles.dropdownRow}>
                    <Dropdown />
                    <Dropdown />
                </div>
            </div>
        );
    }
}

export default MainComponent;
