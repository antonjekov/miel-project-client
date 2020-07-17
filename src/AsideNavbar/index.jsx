import React from "react";
import { Nav } from 'react-bootstrap';
import styles from './index.module.css';
import { useAuth } from "../contexts/Auth";

function AsideNavbar(props) {
    const categoryName = props.categoryName
    const { categories } = useAuth();
    const categoryInfo = categories.find(x=>x.name===categoryName)
    
    const allSubcategories = categoryInfo&&categoryInfo.subcategories.map(subcategory =><Nav.Link className={styles.navLink} key={subcategory._id} href={`products/${categoryName}/${subcategory.name}`}>{subcategory.name}</Nav.Link>);

    return (
        <Nav  className="flex-column" >
            <Nav.Link id={styles.navTitle} disabled>{categoryName.toUpperCase()}</Nav.Link>
            <br></br>
            {allSubcategories}
        </Nav>
        
    );
}

export default AsideNavbar;

