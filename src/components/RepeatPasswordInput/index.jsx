import React from 'react'
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function RepeatPasswordInput({values, errors, handleChange}) {
    return (
        <Form.Group >
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control className={styles['form-control']} value={values.repassword} onChange={handleChange} type="password" placeholder="Repeat Password" name='repassword' isInvalid={!!errors.repassword} isValid={values.repassword && !errors.repassword} />
        <Form.Control.Feedback type='invalid' >{errors.repassword}</Form.Control.Feedback>
        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
    </Form.Group>
    )
}

export default RepeatPasswordInput