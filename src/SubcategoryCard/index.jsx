import React from "react";
import { Card } from 'react-bootstrap';
import styles from './index.module.css';

function SubcategoryCard (props){

  const category = props.category

return (
<Card border="warning"  style={{ width: '15rem', height: '15rem'}}>
  <Card.Img variant="top" src={props.subcategory.imageUrl} />
  <Card.Body>    
    <Card.Link className={styles.CardLink} href={`products/${category&&category.name}/${props.subcategory.name}`} >{props.subcategory.name}</Card.Link>
  </Card.Body>
</Card>
);
}

export default SubcategoryCard;