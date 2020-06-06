import React from "react";
import { Nav } from 'react-bootstrap';
import styles from './AsideNavbar.module.css';

function AsideNavbar() {
    return (
        <Nav  className="flex-column" >
            <Nav.Link id={styles.navTitle} disabled>HONEY</Nav.Link>
            <br></br>
            <Nav.Link href="#miel/acacia">Acacia</Nav.Link>
            <Nav.Link className={styles.navLink} href="#miel/pino/">Pino</Nav.Link>
            <Nav.Link className={styles.navLink} href="#miel/mountain">Mountain</Nav.Link>
            <Nav.Link className={styles.navLink} href="#miel/tila">Tila</Nav.Link>
            <Nav.Link className={styles.navLink} href="#miel/bosque">Bosque</Nav.Link>
        </Nav>
        
    );
}

export default AsideNavbar;

