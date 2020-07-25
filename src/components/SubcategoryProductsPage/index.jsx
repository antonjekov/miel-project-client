import React, { useState, useEffect, Fragment } from 'react';
import styles from './index.module.css';
import ProductCard from "../PoductCard" ;
import { CardColumns, Col, Row } from 'react-bootstrap';
import subcategoryService from '../../services/subcategory_service';
import AsideNavbar from '../AsideNavbar';
import { useAuth } from "../../contexts/Auth";



function SubcategoryProducts(props) {

    const categoryId = props.match.params.category
    const subcategoryId = props.match.params.subcategory;
    const { categories } = useAuth();
    const category= categories?.find(x => x._id === categoryId);
    const subcategory =category? category.subcategories?.find(x => x._id === subcategoryId):null

    const [products, SetProducts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const result = await subcategoryService.allProductsInSubcat({ subcategoryId })
            const subcategory = await result.json();
            const productsInfo = subcategory.products
            SetProducts(productsInfo)
        }
        fetchData()
    }, [subcategoryId])

    
    return (

        <Fragment >
            <Row>
                <Col md={2}><AsideNavbar categoryId={categoryId} /></Col>
                <Col md={10}>
                    <Row className={styles.Subcategory}>
                        <Col md={{ offset: 4, span: 2 }}>
                            <img className={styles.SubcategoryImg} src={subcategory && subcategory.imageUrl} alt="Subcategory"></img>
                        </Col>
                        <Col md={{ span: 2 }}>
                            <p >{subcategory && subcategory.description}</p>
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