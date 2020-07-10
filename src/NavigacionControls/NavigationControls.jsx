import React, { useContext, useState, Fragment } from "react";
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import logo from "./bee.png";
import styles from './NavigationControls.module.css';
import UserContext from "../contexts/UserContext";
import { useAuth } from "../contexts/Auth";
import userService from "../services/user_service";


function NavigationControls(props) {
    const {userInfo} = useAuth();
    
    const logout = ()=>{
        userService.logout().then(res => {
            if (!res.ok) {
                throw new Error();
            }
            localStorage.removeItem("userInfo")
            window.location.href = '/';
        }).catch(console.error)
    }

    return (

        <Navbar bg="light" expand="lg" sticky="top">
            <Container className={styles.brand}>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Bee logo"
                    />
                </Navbar.Brand>
            </Container>

            <Container className="justify-content-center">
                {userInfo?
                <Nav.Link className={styles.navLink} onClick={logout}>Logout</Nav.Link>:
                <Fragment>
                <Nav.Link className={styles.navLink} href="/login">Login</Nav.Link>
                <Nav.Link className={styles.navLink} href="/register">Register</Nav.Link> 
                </Fragment>               
                }

                <Nav.Link className={styles.navLink} href="/contacts">Contacts</Nav.Link>
                <Nav.Link className={styles.navLink} href="/articles">Articles</Nav.Link>

                {userInfo&&userInfo.role==='admin'?
                <Fragment>
                <Nav.Link className={styles.navLink} href="/add-product">Add Product</Nav.Link>
                <Nav.Link className={styles.navLink} href="/add-subcategory">Add Subcategory</Nav.Link>
                </Fragment>:''
                }

            </Container>
            {userInfo?(<Container className={styles.user}>
                <Navbar.Text >Welcome {userInfo.name}</Navbar.Text>
            </Container>):''}
            
            {userInfo?<Button variant="warning" href="/shoppingCard/add"><b>Shopping cart</b> 0 products</Button>:''}
            
        </Navbar>
    );

}

export default NavigationControls;

