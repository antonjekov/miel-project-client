import React from "react";
import MapContainer from "../MapContainer";
import { Row, Col } from 'react-bootstrap';


function Contact(props) {
    return (
        <Row>
            <Col md={{ offset: 2, span: 4 }}>
                <h3>Contact Us</h3>
                <br />
                <h4>Stara Zagora</h4>
                <br/>
                <h5>Miel Store 1</h5>
                <p>Car Simeon Veliki Str. 142<br/>tel: +359 111 111</p>
                <br/>
                <h5>Miel Store 2</h5>
                <p>General Gurko Str 47<br/>tel: +359 222 222</p>
            </Col>
        <Col md={4}>
            <MapContainer></MapContainer>
        </Col>      
           
        </Row >)
}

export default Contact