import React, { useState, useEffect, Fragment } from 'react';
import styles from './index.module.css';
import ProductCard from "../PoductCard";
import { CardColumns, Col, Row } from 'react-bootstrap';
import productService from "../services/product_service";
import subcategoryService from '../services/subcategory_service';
import AsideNavbar from '../AsideNavbar';


function SubcategoryProducts(props) {

    const category = props.match.params.category;
    const subcategory = props.match.params.subcategory;
    const [products, SetProducts] = useState([]);
    const [subcategoryInfo, SetSubcategoryInfo] = useState({})
    const [subcategories, setSubcategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let result = await subcategoryService.getByCategory(category).then(res => res.json())
            setSubcategories(result)
        }

        fetchData()
    }, [category]);


    useEffect(() => {
        async function fetchData() {
            const allProducts = await productService.getAllWithCatSubcat(category, subcategory).then(res => res.json());
            SetProducts(allProducts)
        }
        fetchData()
    }, [category, subcategory])

    useEffect(() => {
        async function fetchData() {
            const searchedSubcategory = await subcategoryService.getByCategory(category).then(res => res.json()).then(res => res.find(x => x.name === subcategory))
            SetSubcategoryInfo(searchedSubcategory)
        }
        fetchData()
    }, [category, subcategory])

    return (

        <Fragment >
            <Row>
                <Col md={2}><AsideNavbar categoryName={category} subcategories={subcategories} /></Col>
                <Col md={10}>
                    <Row className={styles.Subcategory}>
                        <Col md={{ offset: 4, span: 2 }}>
                            <img className={styles.SubcategoryImg} src={subcategoryInfo.imageUrl} alt="Subcategory"></img>
                        </Col>
                        <Col md={{ span: 2 }}>
                            <p >{subcategoryInfo.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <CardColumns className={styles.CardColumns}>
                            {products.map(product => <ProductCard key={product._id} product={product} />)}
                        </CardColumns>
                    </Row>
                </Col>
            </Row>

        </Fragment>

    );
}

export default SubcategoryProducts;