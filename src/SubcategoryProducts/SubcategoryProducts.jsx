import React, { useState, useEffect, Fragment } from 'react';
import styles from './SubcategoryProducts.module.css';
import ProductCard from "../PoductCard/ProductCard";
import {CardColumns, Col, Row } from 'react-bootstrap';
import productService from "../services/product_service";
import subcategoryService from '../services/subcategory_service';


function SubcategoryProducts(props) {

    const category = props.match.params.category;
    const subcategory = props.match.params.subcategory;
    const [products, SetProducts] = useState([]);
    const [subcategoryInfo, SetSubcategoryInfo] = useState({})
    useEffect(() => {
        async function fetchData() {
            const allProducts = await productService.getAllWithCatSubcat(category,subcategory).then(res=>res.json());
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
            <Row className={styles.SubcategoryImage}>
                <Col md={{ offset: 4, span: 2 }}>
                    <img src={subcategoryInfo.imageUrl} alt="Subcategory"></img>
                </Col>
                <Col md={{ span: 2 }}>
                        {subcategoryInfo.description}                    
                </Col>
            </Row>
            
                <CardColumns>
                    {products.map(product => <ProductCard key={product._id} product={product} />)}
                </CardColumns>
            
        </Fragment>

    );
}

export default SubcategoryProducts;