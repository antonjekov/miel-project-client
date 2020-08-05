import React from 'react'
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function DescriptionInput({ values, errors, handleChange }) {
    return (
        <Form.Group >
            <Form.Label>Description</Form.Label>
            <Form.Control className={styles['form-control']} type="text" placeholder="Description" value={values.description} name='description' onChange={handleChange} isInvalid={!!errors.description} isValid={values.description && !errors.description}>
            </Form.Control>
            <Form.Control.Feedback type='invalid' >{errors.description}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default DescriptionInput