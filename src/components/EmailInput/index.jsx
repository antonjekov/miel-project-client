import React from 'react'
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function EmailInput({values, errors, handleChange}) {
    return (
        <Form.Group >
            <Form.Label>Email address</Form.Label>
            <Form.Control className={styles['form-control']} value={values.username} onChange={handleChange} type="email" placeholder="Enter email" name='username' isInvalid={!!errors.username} isValid={values.username && !errors.username} />
            <Form.Control.Feedback type='invalid' >{errors.username}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default EmailInput