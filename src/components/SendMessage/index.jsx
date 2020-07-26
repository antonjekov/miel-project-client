import { Form, Button, Spinner, Col, Alert } from 'react-bootstrap';
import styles from './index.module.css';
import React, { useState } from 'react';
import messageSchema from "../../schemas/messageSchema";
import { useFormik } from "formik";
import messageService from "../../services/message_service";
function SendMessage(props) {

    const [showUnsuccess, setShowUnsuccess] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //Formik integration hook
    const { handleSubmit, handleChange, errors, values, resetForm } = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: messageSchema,
        onSubmit(values, actions) {
            setIsLoading(true);
            resetForm()
            messageService.send(values)
                .then(async res => {
                    if (!res.ok) {
                        setIsLoading(false);
                        const errorsObject = await res.json()
                        actions.setErrors(errorsObject)
                        return
                    }
                    setShowSuccess(true)
                    setTimeout(()=>{setShowSuccess(false)},3000)
                    setIsLoading(false);
                    resetForm()
                })
                .catch(err => {
                    setIsLoading(false);
                    setShowUnsuccess(true)
                    setTimeout(()=>{setShowSuccess(false)},3000)
                });

        }
    });

    const buttonDisabled = (!!Object.keys(errors).length)||(values.message==='')

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h3>Send a message</h3>
            </div>
            <br></br>
            <Form.Row>
                <Col>
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control className={styles['form-control']} type="text" placeholder="Enter your name" name='name' value={values.name} onChange={handleChange} isInvalid={!!errors.name} isValid={values.name && !errors.name} />
                        <Form.Control.Feedback type='invalid' >{errors.name}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>

                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className={styles['form-control']} value={values.email} onChange={handleChange} type="email" placeholder="Enter email" name='email' isInvalid={!!errors.email} isValid={values.email && !errors.email} />
                        <Form.Control.Feedback type='invalid' >{errors.email}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Row>
                <Col>
                    <Form.Group >
                        <Form.Label>Message</Form.Label>
                        <Form.Control as='textarea' className={styles['form-control']} value={values.message} onChange={handleChange} placeholder="Write you message here" name='message' isInvalid={!!errors.message} isValid={values.message && !errors.message} />
                        <Form.Control.Feedback type='invalid' >{errors.message}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
            {isLoading ?
                <Spinner animation="border" variant="warning" /> :
                <Button variant="warning" type="submit" disabled={buttonDisabled}>Send</Button>}
            </Form.Row>
            
            <br></br>
            <Alert onClick={()=>{setShowUnsuccess(false)}} show={showUnsuccess} variant="warning" dismissible>
                <p>Failed to send message!</p>
            </Alert>
            <Alert onClick={()=>{setShowSuccess(false)}} show={showSuccess} variant="success" dismissible>
                <p>Thank you for the message!</p>
            </Alert>
        </Form>
    )
}

export default SendMessage