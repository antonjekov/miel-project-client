import { Form, Button, Spinner, Col } from 'react-bootstrap';
import styles from './Login.module.css';
import React, { useState, Fragment } from 'react';
import userSchemaLogin from "../schemas/userSchemaLogin";
import { useFormik } from "formik";
import userService from "../services/user_service";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import NavigationControls from "../NavigacionControls/NavigationControls";
import Home from "../Home/Home";
import App from "../App";
import { useAuth } from "../contexts/Auth";


function Login(props) {
    const {userInfo, setUserInfo} = useAuth();
    const setUser = props.setUser
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: userSchemaLogin,
        onSubmit(values, actions) {
            setIsLoading(true);
            userService.login(values)
                .then(async res => {
                    if (!res.ok) {
                        setIsLoading(false);
                        const errorsObject = await res.json()
                        actions.setErrors(errorsObject)
                        return
                    }
                    setIsLoading(false);
                    const userInfo = await res.json();
                    //setUser(true);
                    setUserInfo(userInfo)
                    setLoginSuccess(true);                   
                })
                .catch(err => {
                    console.log(err)//TO DO Must have global handler page for Server errors ...
                });
        }
    });

    if (loginSuccess) {
        return <Redirect to="/"></Redirect>
    }

    return (
        <Col md={{ offset: 4, span: 4 }}>
            <div className={styles.Login}>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h1>Login</h1>
                    </div>
                    <br></br>
                    <Form.Row>
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
                    </Form.Row>
                    {isLoading ?
                        <Spinner animation="border" variant="warning" /> :
                        <Button variant="warning" type="submit" >Login</Button>}
                    <Form.Text >
                        Don't have an account? <a href="/register" >Register</a>
                    </Form.Text>
                </Form>
            </div>
        </Col>)
}

export default Login