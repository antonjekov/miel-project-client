import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import styles from './ShoppingCard.module.css';
import { useAuth } from "../contexts/Auth";
import userService from "../services/user_service"
import { useHistory } from "react-router-dom";
import ProductInShoppingCart from "../ProductInShoppingCart";


function ShoppingCard(props) {

    const history = useHistory()
    const { setUserInfo } = useAuth();
    const [productsInCart, setProductsInCart] = useState([])
    const userReducer = (array)=>{
        const reduced = array.reduce((acc, curr) => {
           const existingProduct = acc.find(x => x._id.toString() === curr._id.toString());
            existingProduct ? existingProduct.quantity++ : acc.push({ ...curr, quantity: 1 })
            return acc;
        }, []);
        return reduced
    }
    
    useEffect(() => {
        async function fetchData() {
            const res = await userService.shoppingCartGet();
            if (res.status===401) {
                history.push('/login')
                return
            }
            const resObject = await res.json();
            const reduced =userReducer(resObject);
            return setProductsInCart(reduced);               
        }
        fetchData()        
    }, [history])
    
    const subtotal = productsInCart.reduce((acc, curr) => {
        acc += curr.price * curr.quantity
        return acc
    }, 0)
    const shipping = 5;
    
    const checkout = async () => {
        const res = await userService.shoppingCartCheckout();
        if (res.status===401) {
            history.push('/login')
            return
        }
        const user = await res.json()
        setUserInfo(user)
        history.push('/');
    }

    const products = productsInCart.map(product => <ProductInShoppingCart key={product._id} product={product} />);

    return (
        <Fragment>
            <Col md={{ offset: 2, span: 9 }}>
                <Container className={styles.ProductsContainer}>
                    {products}
                </Container>
                <Row>
                    <Col md={2}>
                        <Button variant="warning" size='sm' onClick={() => history.goBack()}>Continue Shopping</Button>
                    </Col>
                    {subtotal ?
                        <Fragment>
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
                                <Button variant="danger" size='sm' onClick={checkout}>Checkout</Button>
                            </Col>
                        </Fragment> : ''
                    }
                </Row>
            </Col>
        </Fragment>
    )
}

export default ShoppingCard