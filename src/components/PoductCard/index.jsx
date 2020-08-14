import React from "react";
import { Card, Button } from 'react-bootstrap';
import styles from './index.module.css';
import productService from "../../services/product_service";
import { useAuth } from  "../../contexts/Auth";
import shoppingCart_service from "../../services/shoppingCart_service";
import { useHistory } from "react-router-dom";
import ProductPrice from "../ProductPrice";
import DiscountCircle from "../DiscountCircle";

function ProductCard(props) {
    const { userInfo, setUserInfo } = useAuth();
    const role = userInfo ? userInfo.role : ''
    const { availability, _id, name, discount} = props.product
    const history = useHistory()

    async function deleteProduct() {
        productService.delete(_id);
        window.location.reload(false);
    }

    async function editProduct() {
        history.push(`/edit-product/${_id}`) 
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
            {availability.toLowerCase()==='available'?<DiscountCircle discount={discount}/>:null}                      
            <Card.Img variant="top" className={styles.CardImg}  src={props.product.imageUrl} alt='image of product' />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{availability}</Card.Text>
                <Card.Text><ProductPrice product={props.product} styled={true}></ProductPrice></Card.Text>                
                {role === 'admin' ? 
                <div className={styles.Buttons}>
                <Button className={styles.DeleteButton} variant="danger" onClick={deleteProduct}>Delete</Button>
                <span><Button  variant="warning" onClick={editProduct}>Edit</Button></span> 
                </div>: ''}
                {role !== 'admin' && availability.toLowerCase() === 'available' ? 
                <Button className={styles.Buttons} variant="warning" onClick={addToShoppingCard} >Add to Shopping Card</Button> : ''}
            </Card.Body>
        </Card>
    );
}

export default ProductCard;