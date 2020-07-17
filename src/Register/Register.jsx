import { Form, Button, Col, Spinner } from 'react-bootstrap';
import styles from './Register.module.css';
import React, { useState } from 'react';
import userService from "../services/user_service";
import userSchema from "../schemas/userSchema";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

function Register(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    
    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {
            username: '',
            password: '',
            repassword: '',
            name: '',
        },
        validationSchema: userSchema,
        onSubmit(values, actions) {
            setIsLoading(true);
            userService.register(values)
                .then(async res => {
                    if (!res.ok) {
                        setIsLoading(false);
                        const errorsObject = await res.json()
                        actions.setErrors(errorsObject)
                        return
                    }
                    setIsLoading(false);
                    setLoginSuccess(true);
                })
                .catch(err => {
                    console.log(err)//TO DO Must have  page for Server errors ...
                });
        }
        
    });

    return (loginSuccess ? <Redirect to='/login' /> :
    <Col md={{ offset: 2, span: 8 }}>
        <div className={styles.Register}>
            <Form onSubmit={handleSubmit}>
                <div>
                    <h1>Register</h1>
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
                    <Col>
                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className={styles['form-control']} value={values.username} onChange={handleChange} type="email" placeholder="Enter email" name='username' isInvalid={!!errors.username} isValid={values.username && !errors.username} />
                            <Form.Control.Feedback type='invalid' >{errors.username}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={styles['form-control']} value={values.password} onChange={handleChange} type="password" placeholder="Password" name='password' isInvalid={!!errors.password} isValid={values.password && !errors.password} />
                            <Form.Control.Feedback type='invalid' >{errors.password}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control className={styles['form-control']} value={values.repassword} onChange={handleChange} type="password" placeholder="Repeat Password" name='repassword' isInvalid={!!errors.repassword} isValid={values.repassword && !errors.repassword} />
                            <Form.Control.Feedback type='invalid' >{errors.repassword}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>
                {isLoading ?
                    <Spinner animation="border" variant="warning" /> :
                    <Button variant="warning" type="submit" >Register</Button>}
                <Form.Text >
                    Already have an account? <a href="/login" ><b>Login</b></a>
                </Form.Text>
            </Form>
        </div>
    </Col>
        
    );
}

export default Register