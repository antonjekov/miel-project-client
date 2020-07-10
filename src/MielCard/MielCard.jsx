import React from "react";
import { Card } from 'react-bootstrap';
import styles from './MielCard.module.css';

function MielCard (props){

return (
<Card border="warning"  style={{ width: '15rem', height: '15rem'}}>
  <Card.Img variant="top" src={props.subcategory.imageUrl} />
  <Card.Body>
    {/* <Card.Text>
      {props.subcategory.description}
    </Card.Text> */}
    <Card.Link className={styles.CardLink} href={`products/${props.category.name}/${props.subcategory.name}`} >{props.subcategory.name}</Card.Link>
  </Card.Body>
</Card>
);
}

export default MielCard;