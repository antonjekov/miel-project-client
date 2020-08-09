import { Form, Button, Col, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import userService from "../../services/user_service";
import userSchema from "../../schemas/userSchema";
import { useFormik } from "formik";
import { Redirect,Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import FormContentWrapper from "../FormContentWrapper"
import PasswordInput from "../PasswordInput";
import RepeatPasswordInput from "../RepeatPasswordInput";
import EmailInput from "../EmailInput";
import NameInput from "../NameInput";


function Register(props) {
    const { setUserInfo } = useAuth();
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
                    const userInfo = await res.json()
                    setUserInfo(userInfo)
                    setIsLoading(false);
                    setLoginSuccess(true);
                });
        }

    });

    return (loginSuccess ? <Redirect to='/' /> :
        <Col md={{ offset: 2, span: 8 }}>
            <FormContentWrapper title='Register'>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <NameInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <EmailInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <PasswordInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <RepeatPasswordInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>
                    {isLoading ?
                        <Spinner animation="border" variant="warning" /> :
                        <Button variant="warning" type="submit" >Register</Button>}
                    <Form.Text >
                        Already have an account? <Link to="/login" ><b>Login</b></Link>
                    </Form.Text>
                </Form>
            </FormContentWrapper>
        </Col>

    );
}

export default Register