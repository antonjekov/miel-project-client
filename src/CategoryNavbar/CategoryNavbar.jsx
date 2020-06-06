import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import styles from './CategoryNavbar.module.css';

function CategoryNavbar() {
    return (<Navbar bg="light" expand="lg"  className="justify-content-center">
        
        <Nav.Link className={styles.navLink} href="#miel">MIEL</Nav.Link>
        <Nav.Link className={styles.navLink} href="#polen">APITHERAPY</Nav.Link>
        <Nav.Link className={styles.navLink} href="#propolis">COSMETIC</Nav.Link>
        <Nav.Link className={styles.navLink} href="#cosmetica">OTHER BEE PRODUCTS</Nav.Link>
        

    </Navbar>);
}

export default CategoryNavbar;

