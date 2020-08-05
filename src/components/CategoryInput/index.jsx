import React from "react";
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function CategoryInput({ values, errors, handleChange,categoryOptions }) {

    return (
        <Form.Group controlId="category">
            <Form.Label >Category</Form.Label>
            <Form.Control className={styles['form-control']} as="select" value={values.category} name='category' onChange={handleChange} isInvalid={!!errors.category} isValid={values.category && !errors.category}>
                <option></option>
                {categoryOptions}
            </Form.Control>
            <Form.Control.Feedback type='invalid' >{errors.category}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default CategoryInput