import React from "react";
import { Card, Button } from 'react-bootstrap';
import styles from './index.module.css';
import productService from "../../services/product_service";
import { useAuth } from  "../../contexts/Auth";
import shoppingCart_service from "../../services/shoppingCart_service";
import { useHistory } from "react-router-dom";

function ProductCard(props) {
    const { userInfo, setUserInfo } = useAuth();
    const role = userInfo ? userInfo.role : ''
    const { availability, _id, name, description, price } = props.product
    const history = useHistory()
    async function deleteProduct() {
        productService.delete(_id);
        window.location.reload(false);
    }


    const addToShoppingCard = async () => {
        const res = await shoppingCart_service.shoppingCardAdd({productId: _id })
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json()
        setUserInfo(user)
        history.push("/shoppingCard")       
    }

    return (
        <Card border="warning" style={{ width: '18rem', height: '25rem' }}>
            <Card.Img variant="top" className={styles.CardImg}  src={props.product.imageUrl} alt='image of product' />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    {availability}
                </Card.Text>
                {availability.toLowerCase() === 'available' ? <Card.Text className={styles.Price}>
                    {`${price?.toFixed(2)} €`}
                </Card.Text> : ''}

                {role === 'admin' ? <Button variant="danger" onClick={deleteProduct}>Delete product</Button> : ''}
                {role !== 'admin' && availability.toLowerCase() === 'available' ? <Button variant="warning" onClick={addToShoppingCard} >Add to Shopping Card</Button> : ''}
            </Card.Body>
        </Card>
    );
}

export default ProductCard;