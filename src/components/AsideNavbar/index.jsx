import React from "react";
import { Nav } from 'react-bootstrap';
import styles from './index.module.css';
import { useAuth } from "../../contexts/Auth";

function AsideNavbar(props) {

    const { categories } = useAuth();
    const categoryId = props.categoryId
    const categoryInfo = categories?.find(x => x._id === categoryId);

    const allSubcategories = categoryInfo && categoryInfo.subcategories.map(subcategory => <Nav.Link className={styles.navLink} key={subcategory._id} href={`/products/${categoryId}/${subcategory._id}`}>{subcategory.name}</Nav.Link>);

    return (
        <Nav className="flex-column" >
            <Nav.Link id={styles.navTitle} disabled>{categoryInfo && categoryInfo.name.toUpperCase()}</Nav.Link>
            <br></br>
            {allSubcategories}
        </Nav>

    );
}

export default AsideNavbar;

