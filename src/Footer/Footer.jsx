import React from 'react';
import styles from './Footer.module.css';
function Footer(props) {

    return (
        <footer className="fixed-bottom">
            <div className={styles.Footer}>
            <p>Anton Zhekov SoftUni project &#169; 2020</p>
            </div>            
        </footer>);
}

export default Footer;