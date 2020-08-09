import React from "react";
import shoppingCart_service from "../../services/shoppingCart_service"
import { Image, Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { useAuth } from "../../contexts/Auth";
import styles from "./index.module.css";
import { useHistory} from "react-router-dom";
import ProductPrice from "../ProductPrice";


function ProductInShoppingCart(props) {
    const history = useHistory()
    const { _id, imageUrl, name, quantity, price, discount } = props.product
    
    const {  setUserInfo } = useAuth();
    const deleteOneFromCart = async () => {
        const res = await shoppingCart_service.deleteOneFromShoppingCard({productId: _id });
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json();
        setUserInfo(user)
        history.push('/temp');
        history.goBack();
    }

    const deleteAllFromShoppingCart = async () => {
        const res = await shoppingCart_service.deleteAllFromShoppingCart({ productId: _id });
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json();
        setUserInfo(user)
        history.push('/temp');
        history.goBack();
    }

    const addOneToCart = async () => {
        const res = await shoppingCart_service.shoppingCardAdd({productId: _id })
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json();
        setUserInfo(user)
        history.push('/temp');
        history.goBack();
    }

    return (
        <Row key={_id}>
            <Col md={2}>
                <Image className={styles.ProductImage} src={imageUrl} thumbnail />
            </Col>
            <Col md={3}>
                <div className={styles.Wrapper}>{name}</div>
            </Col>
            <Col md={2}>
            <ProductPrice product={props.product}></ProductPrice>
            </Col>
            <Col md={2}>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={deleteOneFromCart} variant="secondary" size="sm">-</Button>
                    <div className={styles.Bordered}>
                        <Button disabled size="sm" variant="light">{quantity}</Button>
                    </div>
                    <Button onClick={addOneToCart} variant="secondary" size="sm">+</Button>
                </ButtonGroup>
            </Col>
            <Col md={2}>
                <span>{((price-(discount?discount/100*price:0)) * quantity).toFixed(2)} €</span>
            </Col>
            <Col md={1}>
                <Button variant="secondary" size='sm' onClick={deleteAllFromShoppingCart}>X</Button>
            </Col>
        </Row>)
}

export default ProductInShoppingCart