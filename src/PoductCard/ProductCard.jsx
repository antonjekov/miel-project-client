import React from "react";
import { Card, Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';
import productService from "../services/product_service";
import { useAuth } from "../contexts/Auth";
import userService from "../services/user_service";

function ProductCard(props) {

    const {userInfo} = useAuth();
    const role =userInfo? userInfo.role:''
    const {availability,_id,name,description,price} = props.product
    
    async function deleteProduct(){
        productService.delete(_id);
        window.location.reload(false);    
    }


    async function addToShoppingCard(){
        userService.shoppingCardAdd({userId:userInfo._id,productId:_id})
    }

    return (
        <Card border="warning" style={{ width: '18rem' , height: '30rem'}}>
            <Card.Img variant="top" style={{ width: '10rem', height: '10rem' }} src={props.product.imageUrl} alt='image of product' />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    {availability}
                </Card.Text>
                {availability.toLowerCase()==='available'?<Card.Text className={styles.Price}>
                    {`${price?.toFixed(2)} €`}
                </Card.Text>:''}
                
                {role==='admin'?<Button variant="danger" onClick={deleteProduct}>Delete product</Button>:''}
                {role!=='admin'&&availability.toLowerCase()==='available'?<Button variant="warning" onClick={addToShoppingCard} >Add to Shopping Card</Button>:''}
            </Card.Body>
        </Card>
    );
}

export default ProductCard;