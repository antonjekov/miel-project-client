import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from "./bee.png";
import styles from './NavigationControls.module.css';

function NavigationControls(props) {

    const userName = props.userName;

    return (<Navbar bg="light" expand="lg" sticky="top">
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
            <Nav.Link className={styles.navLink} href="/login">Login</Nav.Link>
            <Nav.Link className={styles.navLink} href="/register">Register</Nav.Link>

            <Nav.Link className={styles.navLink} href="/logout">Logout</Nav.Link>
            <Nav.Link className={styles.navLink} href="#contacts">Contacts</Nav.Link>
            <Nav.Link className={styles.navLink} href="#articles">Articles</Nav.Link>

            <Nav.Link className={styles.navLink} href="/add-product">Add Product</Nav.Link>
            <Nav.Link className={styles.navLink} href="#contacts">Edit Product</Nav.Link>

        </Container>

        {userName?
        <Container className={styles.user}>
            <Navbar.Text >Welcome {userName}</Navbar.Text>
        </Container>:null
        }


    </Navbar>);
}

export default NavigationControls;

