import React from "react";
import { Row, Col } from 'react-bootstrap';
import AsideNavbar from '../AsideNavbar';
import SubcategoryCardContainer from '../SubcategoryCardContainer';

function CategoryPage(props) {

  const categoryName = props.category

  return <Row  >
    <Col md={2}><AsideNavbar categoryName={categoryName} /></Col>
    <Col md={10}><SubcategoryCardContainer categoryName={categoryName} /> </Col>
  </Row>
}

export default CategoryPage