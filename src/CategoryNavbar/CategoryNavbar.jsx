import React, { useEffect, useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import styles from './CategoryNavbar.module.css';
import categoryService from "../services/category_service";

function CategoryNavbar() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchData() {
            let result = await categoryService.getAll().then(res => res.json())
            setCategories(result)
        }

        fetchData()
    }, []);

    const allCategories = categories.map(category => <Nav.Link key={category._id} className={styles.navLink} href={`/${category.name.toLowerCase()}`}>{category.name.toUpperCase()}</Nav.Link>);

    return (<Navbar bg="light" expand="lg" className="justify-content-center">
        {allCategories}
    </Navbar>);
}

export default CategoryNavbar;

