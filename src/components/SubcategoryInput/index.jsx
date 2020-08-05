import React from "react";
import styles from './index.module.css';
import { Form } from 'react-bootstrap';

function SubcategoryInput({ values, errors, handleChange, subcategoryOptions }) {

    return (
        <Form.Group >
            <Form.Label>Subcategory</Form.Label>
            <Form.Control className={styles['form-control']} as="select" value={values.subcategory} name='subcategory' onChange={handleChange} isInvalid={!!errors.subcategory} isValid={values.subcategory && !errors.subcategory}>
                <option></option>
                {subcategoryOptions}
            </Form.Control>
            <Form.Control.Feedback type='invalid' >{errors.subcategory}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
        </Form.Group>
    )
}

export default SubcategoryInput