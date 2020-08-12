import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button} from 'react-bootstrap';

const REACT_APP_SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const stripePromise = loadStripe('pk_test_51HEvkkCPJwJRNJ7QMNAwhQ4E9lTFvtemxd3mmdeG5fyRovRBzYdyNTg2MNVJ6QnzTc9aznH1GS6RzzbEQ9o7dBP3007LVJKjxU');

function ButtonCheckout(props) {

    const sendInfo = (data) => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return fetch(`${REACT_APP_SERVER_API_URL}stripe-payment`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            credentials: 'include'
        })
    }
    const handleClick = async (event) => {
        try {
            const response = await sendInfo(props.products)
            const resInfo = await response.json();
            const sessionId = resInfo.session_id;
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId,
            });

        } catch (error) {
            //If its not possible to redirect we must make any ...
        }

    };
    return (
        <Button variant="danger" size='sm' onClick={handleClick}>Checkout stripe</Button>        
    );
}

export default ButtonCheckout