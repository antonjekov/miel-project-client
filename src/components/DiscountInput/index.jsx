import React from 'react'
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function DiscountInput({ values, errors, handleChange }) {
    return (
        <Form.Group >
            <Form.Label>Discount</Form.Label>
            <Form.Control className={styles['form-control']} type="number" name='discount' value={values.discount} onChange={handleChange} isInvalid={!!errors.discount} isValid={values.discount && !errors.discount} />
            <Form.Control.Feedback type='invalid'>{errors.discount}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default DiscountInput