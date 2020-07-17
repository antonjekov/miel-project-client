import React, { Fragment } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import styles from './CategoryNavbar.module.css';
import NavigacionControls from "../NavigacionControls/NavigationControls";
import { useAuth } from "../contexts/Auth";


function CategoryNavbar() {
    
    const { categories } = useAuth();
    const allCategories = categories.map(category => <Nav.Link key={category._id} className={styles.navLink} href={`/${category.name.toLowerCase()}`}>{category.name.toUpperCase()}</Nav.Link>);

    return (
        <Fragment>
            <NavigacionControls />
            <Navbar bg="light" expand="lg" className="justify-content-center" sticky="top">
                {allCategories}
            </Navbar>
        </Fragment>)
}

export default CategoryNavbar;

