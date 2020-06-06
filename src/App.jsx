import React, { useState } from 'react';
import './App.css';
import { Row, Col, Container } from 'react-bootstrap';
import Footer from './Footer/Footer';
import NavigationControls from "./NavigacionControls/NavigationControls";
import CategoryNavbar from './CategoryNavbar/CategoryNavbar';
import AsideNavbar from './AsideNavbar/AsideNavbar';
import Miel from './Miel/Miel';
import Login from './Login/Login';
import Register from './Register/Register';
// import AddProduct from './AddProduct/AddProduct';
// import ImageUpload from './ImageUpload/ImageUpload';
// import ImageUploader from './ImageUploader/ImageUploader';
import Logout from "./Logout/Logout";
import AddProductFormic from './AddProductFormic/AddProductFormic';
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {

  const [userName, setUserName] = useState('');

  return (
    <BrowserRouter>
      {/* <Fragment> */}

      <NavigationControls userName={userName} />
      <CategoryNavbar />
      <Switch>

        <Route path="/login">
          <Container fluid>
            <Row  >
              <Col md={{ offset: 4, span: 4 }}>
                <Login setUserName={setUserName} />
              </Col>
            </Row>
          </Container>
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route path="/register">
          <Container fluid>
            <Row  >
              <Col md={{ offset: 2, span: 8 }}><Register /></Col>
            </Row>
          </Container>
        </Route>

        <Route path="/add-product">
          <Container fluid>
            <Row  >
              <Col md={{ offset: 3, span: 6 }}><AddProductFormic /></Col>
            </Row>
          </Container>
        </Route>

        <Route path="/">
          <Container fluid>
            <Row  >
              <Col md={2}><AsideNavbar /></Col>
              <Col md={10}><Miel /> </Col>
            </Row>
          </Container>
        </Route>

      </Switch>
      <Footer />
      {/* </Fragment> */}
    </BrowserRouter>

    //AddProductFormik
    // <Container fluid>
    //   <Row>
    //     <Col><NavigationControls /></Col>
    //   </Row>

    //   <Row  >
    //     <Col md={{offset:3, span:6}}><AddProductFormic /></Col>
    //    </Row>
    //   <Row>
    //     <Col ><Footer /></Col>
    //   </Row>
    // </Container>

    // //AddProduct
    // <Container fluid>
    //   <Row>
    //     <Col><NavigationControls /></Col>
    //   </Row>

    //   <Row  >
    //     <Col md={{offset:3, span:6}}><AddProduct /></Col>
    //    </Row>
    //   <Row>
    //     <Col ><Footer /></Col>
    //   </Row>
    // </Container>

    // //Register Page
    // <Container fluid>
    //   <Row>
    //     <Col><NavigationControls /></Col>
    //   </Row>
    //   <Row>
    //     <Col><CategoryNavbar /></Col>
    //   </Row>
    //   <Row  >
    //     <Col md={{ offset: 2, span: 8 }}><Register /></Col>
    //   </Row>
    //   <Row>
    //     <Col ><Footer /></Col>
    //   </Row>
    // </Container>

    // //Login Page
    // <Container fluid>
    //   <Row>
    //     <Col><NavigationControls /></Col>
    //   </Row>
    //   <Row>
    //     <Col><CategoryNavbar /></Col>
    //   </Row>
    //   <Row  >
    //     <Col md={{ offset: 2, span: 8 }}><Login /></Col>
    //   </Row>
    //   <Row>
    //     <Col ><Footer /></Col>
    //   </Row>
    // </Container>


    // //Home Page
    //     <Container fluid>
    //       <Row>
    //         <Col><NavigationControls /></Col>
    //       </Row>
    //       <Row>
    //         <Col><CategoryNavbar /></Col>
    //       </Row>
    //       <Row  >
    //         <Col md={2}><AsideNavbar /></Col>
    //         <Col md={10}><Miel /> </Col>
    //       </Row>
    //       <Row>
    //         <Col><Footer /></Col>
    //       </Row>
    //     </Container>

  );
}

export default App;
