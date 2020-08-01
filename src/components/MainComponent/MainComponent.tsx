import React from 'react';

import styles from './MainComponent.scss';
import Dropdown from '../smallComponents/Dropdown/Dropdown';

const MainComponent: React.FC = ({ children }) => (
    <div className={styles.container}>
        {children}
        <div className={styles.dropdownRow}>
            <Dropdown />
            <Dropdown />
            <Dropdown />
        </div>
    </div>
);

export default MainComponent;
