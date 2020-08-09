import { Form, Button, Spinner, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import userSchemaLogin from "../../schemas/userSchemaLogin";
import { useFormik } from "formik";
import userService from "../../services/user_service";
import { useAuth } from "../../contexts/Auth";
import {Link, useHistory } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import EmailInput from "../EmailInput";
import FormContentWrapper from "../FormContentWrapper"


function Login(props) {
    const history = useHistory()
    const { setUserInfo } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
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
                    setUserInfo(userInfo);
                    history.push('/');
                })
                .catch(err => {
                    console.log(err)//TO DO Must have global handler page for Server errors ...
                });
        }
    });

    return (
        <Col md={{ offset: 4, span: 4 }}>
            <FormContentWrapper title='Login'>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <EmailInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <PasswordInput label='Password' values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>
                    {isLoading ?
                        <Spinner animation="border" variant="warning" /> :
                        <Button variant="warning" type="submit" disabled={!!Object.keys(errors).length}>Login</Button>}
                    <Form.Text >
                        Don't have an account? <Link to="/register" ><b>Register</b></Link>
                    </Form.Text>
                </Form>
            </FormContentWrapper>
        </Col>)
}

export default Login