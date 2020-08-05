import React from 'react'
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function AvailabilityInput({ values, errors, handleChange }) {
    return (
        <Form.Group >
            <Form.Label>Availability</Form.Label>
            <Form.Control className={styles['form-control']} as="select" name='availability' value={values.availability} onChange={handleChange} isInvalid={!!errors.availability} isValid={values.availability && !errors.availability}>
                <option></option>
                <option>Available</option>
                <option>Not available</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid' >{errors.availability}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default AvailabilityInput