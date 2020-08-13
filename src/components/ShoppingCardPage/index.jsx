import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import styles from './index.module.css';
import { useAuth } from "../../contexts/Auth";
import shoppingCart_service from "../../services/shoppingCart_service"
import { useHistory, useParams } from "react-router-dom";
import ProductInShoppingCart from "../ProductInShoppingCart";
import ButtonCheckout from "../ButtonCheckout";
import SuccessMessage from '../SuccessMessage';
import UnSuccessMessage from '../UnSuccessMessage';


function ShoppingCard(props) {

    const history = useHistory()
    const { setUserInfo } = useAuth();
    const {status,session_id}=useParams();
    const [productsInCart, setProductsInCart] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [paymentCanceled, setPaymentCanceled] = useState(false)
    const [paymentSucceed, setPaymentSucceed] = useState(false)
     
    
    useEffect(() => {  
        const checkout = async () => {
            const res = await shoppingCart_service.shoppingCartCheckout();
            if (res.status===401) {
                history.push('/login')
                return
            }
            const user = await res.json()
            setUserInfo(user)
            setTimeout(() => { history.push('/') }, 3500)            
        }      
        if (status==='cancel') {
            setPaymentCanceled(true)
            setTimeout(() => { setPaymentCanceled(false) }, 3000)
        }else if(status==='success'){
            if (session_id) {
                checkout()
                setPaymentSucceed(true)              
            }else{
                setPaymentCanceled(true)
                setTimeout(() => { setPaymentCanceled(false) }, 3000)
            }
        }  
    }, [history,status,session_id,setUserInfo])

    
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
            const res = await shoppingCart_service.shoppingCartGet();
            if (res.status===401) {
                history.push('/login')
                return
            }
            setLoadingProducts(false)
            const resObject = await res.json();
            const reduced =userReducer(resObject);
            return setProductsInCart(reduced);               
        }
        fetchData()        
    }, [history])


    if (paymentSucceed) {
        return(<SuccessMessage show={paymentSucceed} message='Thank you for your purchase !'/>)                      
      }

    if (loadingProducts) {
        return <Spinner animation="border" variant="warning" />
    }
    
    const subtotal = productsInCart.reduce((acc, curr) => {
        acc += curr.price * curr.quantity
        return acc
    }, 0)
    const discount = productsInCart.reduce((acc, curr) => {
        acc += curr.discount?curr.discount/100*curr.price * curr.quantity:0
        return acc
    }, 0)
    const shipping = 5;
    
    

    const products = productsInCart.map(product => <ProductInShoppingCart key={product._id} product={product} />);

   

    return (
        <Fragment>
            <Col md={{ offset: 1, span: 9 }}>
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
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal: </td>
                                            <td className={styles.right}>{subtotal.toFixed(2)} €</td>
                                        </tr>
                                        {discount?
                                        <tr>
                                            <td>Discounts: </td>
                                            <td className={styles.right}>-{discount.toFixed(2)} €</td>
                                        </tr>:''                                        
                                        }
                                        <tr>
                                            <td>Shipping: </td>
                                            <td className={styles.right}>{shipping.toFixed(2)} €</td>
                                        </tr>
                                        <tr>
                                            <th>Total: </th>
                                            <th className={styles.right}>{(subtotal-discount + shipping).toFixed(2)} €</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col md={2}>
                                {/* <Button variant="danger" size='sm' onClick={checkout}>Checkout</Button> */}
                                <ButtonCheckout products={productsInCart}/>
                                </Col>
                        </Fragment> : ''
                    }
                </Row>
                <Row>
                    <Col>
                    <UnSuccessMessage show={paymentCanceled} message='Problem in payment process !'/>
                    </Col>
                </Row>
            </Col>
        </Fragment>
    )
}

export default ShoppingCard