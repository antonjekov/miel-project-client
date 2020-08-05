import React from "react";
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function PasswordInput({values, errors, handleChange}) {
    
    return (
        <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control className={styles['form-control']} value={values.password} onChange={handleChange} type="password" placeholder='Enter your password' name='password' isInvalid={!!errors.password} isValid={values.password && !errors.password} />
            <Form.Control.Feedback type='invalid' >{errors.password}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default PasswordInput