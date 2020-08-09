import React, { Fragment } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import styles from './index.module.css';
import NavigacionControls from "../NavigationControls";
import { useAuth } from "../../contexts/Auth";
import { Link } from "react-router-dom";

function CategoryNavbar() {
    
    const { categories } = useAuth();
    const allCategories = categories.map(category => <Nav.Link as={Link} key={category._id} className={styles.navLink} to={`/category/${category._id}`}>{category.name.toUpperCase()}</Nav.Link>);

    return (
        <Fragment>
            <NavigacionControls />
            <Navbar bg="light" expand="lg" className="justify-content-center" sticky="top">
                {allCategories}
            </Navbar>
        </Fragment>)
}

export default CategoryNavbar;

