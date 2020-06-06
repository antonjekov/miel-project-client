import * as yup from 'yup';
import { Form, Button, Spinner, Col } from 'react-bootstrap';
import styles from './Login.module.css';
import React, { useState } from 'react';
import userSchemaLogin from "../schemas/userSchemaLogin";
import { useFormik } from "formik";
import userService from "../services/user_service";
import { Redirect } from "react-router-dom";


function Login(props) {

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
                    props.setUserName(userInfo.name);
                    setLoginSuccess(true);
                })
                .catch(err => {
                    console.log(err)//TO DO Must have global handler page for Server errors ...
                });
        }
    });

    

    return (loginSuccess ? <Redirect to='/' /> :
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
        </div>)
}

// function Login(props) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState()

//     const changeHandlerEmail = (event) => {
//         setEmail(event.target.value);
//     }

//     const changeHandlerPassword = (event) => {
//         setPassword(event.target.value)
//     }

//     const submitHandler = (event) => {
//         event.preventDefault();
//         userSchema.validate({ username: email, password: password })
//             .then(setErrorMessage(undefined))
//             // .then(data=>this.props.login(data))
//             // .then(res => {
//             //     if (!res.ok) {
//             //             res.text().then((data) => {
//             //                 this.setState({errorMessage:data})
//             //                 return
//             //             });
//             //     }
//             //     return res.json()
//             // })
//             // .then(res=>{
//             //     const user = res;
//             //     localStorage.setItem("userId", user._id);
//             //     localStorage.setItem("username", user.username);

//             // })
//             .catch(err => {
//                 if (err.name === 'ValidationError') {
//                     setErrorMessage(err.errors)
//                     return
//                 }

//                 // this.setState({ errorMessage: err.message })
//             });
//     }

//     const userSchema = yup.object().shape({
//         username: yup
//             .string()
//             .email("Please Enter an valid Email")
//             .required("Email is Required."),
//         password: yup
//             .string()
//             .required("Password is Required.")
//             .max(13, "Password is too long. Must be max 13 chars")
//             .min(6, "Password is too short. Must be min 6 chars")
//     })

//     const haveError = !!errorMessage

//     return (
//         <div className={styles.Login}>
//             <Form noValidate onSubmit={submitHandler}>
//                 <div>
//                     <h2>Login</h2>
//                 </div>
//                 <br></br>
//                 {haveError ? <p>{errorMessage}</p> : null}
//                 <Form.Group >
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control className={styles['form-control']} value={email} onChange={changeHandlerEmail} type="email" placeholder="Enter email" />
//                 </Form.Group>

//                 <Form.Group >
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control className={styles['form-control']} value={password} onChange={changeHandlerPassword} type="password" placeholder="Password" />
//                 </Form.Group>

//                 <Button variant="warning" type="submit" >Login</Button>
//                 <Form.Text >
//                     Don't have an account? <a href="#" >Register</a>
//                 </Form.Text>
//             </Form>
//         </div>
//     );
// }

export default Login