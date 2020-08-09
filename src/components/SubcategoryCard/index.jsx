import React from "react";
import { Card } from 'react-bootstrap';
import styles from './index.module.css';
import { Link} from "react-router-dom";

function SubcategoryCard (props){

return (
<Card border="warning"  style={{ width: '15rem', height: '15rem'}}>  
  <Card.Body>    
    <Card.Link as={Link}  className={styles.CardLink} to={`/products/${props.category._id}/${props.subcategory._id}`} data-testid="productsHref">
      <Card.Img variant="top" src={props.subcategory.imageUrl} data-testid="subcategoryImage"/>
      <div>
      {props.subcategory.name}
      </div>      
    </Card.Link>
  </Card.Body>
</Card>
);
}

export default SubcategoryCard;