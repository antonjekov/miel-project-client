import React from 'react'
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function NameInput({ values, errors, handleChange }) {
    return (
        <Form.Group >
            <Form.Label>Name</Form.Label>
            <Form.Control className={styles['form-control']} type="text" placeholder="Enter name" name='name' value={values.name} onChange={handleChange} isInvalid={!!errors.name} isValid={values.name && !errors.name} />
            <Form.Control.Feedback type='invalid' >{errors.name}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default NameInput