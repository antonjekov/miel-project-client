import React from "react";
import userService from "../services/user_service"
import { Image, Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { useAuth } from "../contexts/Auth";
import styles from "./index.module.css";
import { useHistory } from "react-router-dom";

function ProductInShoppingCart(props) {
    const history = useHistory()
    const { _id, imageUrl, name, quantity, price } = props.product
    const {  setUserInfo } = useAuth();
    const deleteOneFromCart = async () => {
        const res = await userService.deleteOneFromShoppingCard({productId: _id });
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json();
        setUserInfo(user)
        window.location.reload(false);
    }

    const deleteAllFromShoppingCart = async () => {
        const res = await userService.deleteAllFromShoppingCart({ productId: _id });
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json();
        setUserInfo(user)
        window.location.reload(false);
    }

    const addOneToCart = async () => {
        const res = await userService.shoppingCardAdd({productId: _id })
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json();
        setUserInfo(user)
        window.location.reload(false)
    }

    return (
        <Row key={_id}>
            <Col md={2}>
                <Image className={styles.ProductImage} src={imageUrl} thumbnail />
            </Col>
            <Col md={4}>
                <span>{name}</span>
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
                <span>{(price * quantity).toFixed(2)} €</span>
            </Col>
            <Col md={1}>
                <Button variant="secondary" size='sm' onClick={deleteAllFromShoppingCart}>X</Button>
            </Col>
        </Row>)
}

export default ProductInShoppingCart