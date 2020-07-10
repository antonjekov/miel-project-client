import React from "react";
import { Nav } from 'react-bootstrap';
import styles from './AsideNavbar.module.css';


function AsideNavbar(props) {
    const category = props.category
    const subcategories = props.subcategories;
    
    const allSubcategories = subcategories.map(subcategory =><Nav.Link className={styles.navLink} key={subcategory._id} href={`products/${category}/${subcategory.name}`}>{subcategory.name}</Nav.Link>);

    return (
        <Nav  className="flex-column" >
            <Nav.Link id={styles.navTitle} disabled>{category.toUpperCase()}</Nav.Link>
            <br></br>
            {allSubcategories}
        </Nav>
        
    );
}

export default AsideNavbar;

