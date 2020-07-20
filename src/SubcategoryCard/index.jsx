import React from "react";
import { Card } from 'react-bootstrap';
import styles from './index.module.css';

function SubcategoryCard (props){

return (
<Card border="warning"  style={{ width: '15rem', height: '15rem'}}>
  <Card.Img variant="top" src={props.subcategory.imageUrl} />
  <Card.Body>    
    <Card.Link className={styles.CardLink} href={`/products/${props.category._id}/${props.subcategory._id}`} >{props.subcategory.name}</Card.Link>
  </Card.Body>
</Card>
);
}

export default SubcategoryCard;