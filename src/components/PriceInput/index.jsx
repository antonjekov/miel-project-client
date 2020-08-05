import React from "react";
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function PriceInput({ values, errors, handleChange, categoryOptions }) {

    return (
        <Form.Group >
            <Form.Label>Price</Form.Label>
            <Form.Control className={styles['form-control']} type="number" name='price' value={values.price} onChange={handleChange} isInvalid={!!errors.price} isValid={values.price && !errors.price} />
            <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default PriceInput