import React from 'react';
import styles from './index.module.css';
function Footer(props) {
    return (
        <footer >
            <div className={styles.Footer}>
                <p>Anton Zhekov SoftUni project &#169; 2020</p>
            </div>
        </footer>);
}

export default Footer;