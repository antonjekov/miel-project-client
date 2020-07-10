import React, { Fragment, useEffect } from "react";
import { Container, Image, Col, Row, Button } from 'react-bootstrap';
import styles from './ShoppingCard.module.css';
import { useAuth } from "../contexts/Auth";
import userService from "../services/user_service"
import { useState } from "react";


function ShoppingCard(props) {

    const shipping = 5
    const { userInfo } = useAuth();
    const [productsInCart, setProductsInCart] = useState([])
    
    console.log(productsInCart)

    useEffect(() => {
        function fetchData() {
            userService.shoppingCartGet({ userId: userInfo._id }).then(res => res.json()).then(res => setProductsInCart(res))
        }
        fetchData()
    }, [])
    
    const subtotal = productsInCart.reduce((acc, curr) => {
        acc += curr.price
        return acc
    }, 0)


    const products = productsInCart.map(product => {

        const deleteFromCart = async () => {
            await userService.deleteFromShoppingCard({ userId: userInfo._id, productId: product._id });
            console.log(window.location)
            window.location.reload(false)
        }

        return (<Row key={product._id}>
            <Col md={2}>
                <Image className={styles.ProductImage} src={product.imageUrl} thumbnail />
            </Col>
            <Col md={4}>
                <span>{product.name}</span>
            </Col>
            <Col md={2}>
                <span>{product.price.toFixed(2)} EUR</span>
            </Col>
            <Col md={1}>
                <Button variant="secondary" size='sm' onClick={deleteFromCart}>X</Button>

            </Col>
        </Row>)
    });


    return (
        <Fragment>
            <Col md={{ offset: 2, span: 9 }}>
                <Container className={styles.ProductsContainer}>
                    {products}
                </Container>
                <Row>
                    <Col md={2}>
                        <Button variant="warning" size='sm' onClick={() => { window.history.back() }}>Continue Shopping</Button>
                    </Col>
                    <Col md={{ offset: 4, span: 4 }}>
                        <table >
                            <tbody>
                                <tr>
                                    <td>Subtotal: </td>
                                    <td className={styles.right}>{subtotal.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <td>Shipping: </td>
                                    <td className={styles.right}>{shipping.toFixed(2)} €</td>
                                </tr>
                                <tr>
                                    <th>Total: </th>
                                    <th className={styles.right}>{(subtotal + shipping).toFixed(2)} €</th>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col md={2}>
                        <Button variant="danger" size='sm' onClick={() => { window.history.back() }}>Checkout</Button>
                    </Col>
                </Row>
            </Col>

        </Fragment>
    )
}

export default ShoppingCard