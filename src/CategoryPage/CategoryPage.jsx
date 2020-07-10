import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import AsideNavbar from '../AsideNavbar/AsideNavbar';
import Miel from '../Miel/Miel';
import subcategoryService from "../services/subcategory_service";
function CategoryPage(props) {

  const categoryName = props.category
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    const fetchData = async ()=> {
      let result = await subcategoryService.getByCategory(categoryName).then(res => res.json())
      setSubcategories(result)
    }

    fetchData()
  }, [categoryName]);

  return <Container fluid>
    <Row  >
      <Col md={2}><AsideNavbar category={categoryName} subcategories={subcategories} /></Col>
      <Col md={10}><Miel category={categoryName} subcategories={subcategories} /> </Col>
    </Row>
  </Container>
}

export default CategoryPage