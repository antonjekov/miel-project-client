import React from "react";
import { Row, Col } from 'react-bootstrap';
import AsideNavbar from '../AsideNavbar';
import SubcategoryCardContainer from '../SubcategoryCardContainer';
//import { useAuth } from "../contexts/Auth";

function CategoryPage(props) {
  const categoryId = props.match.params.id;
  return <Col>
    <Row>
      <Col md={2}><AsideNavbar categoryId={categoryId} /></Col>
      <Col md={10}><SubcategoryCardContainer categoryId={categoryId} /> </Col>
    </Row>
  </Col>
}

export default CategoryPage