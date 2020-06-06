import React from "react";
import { Card } from 'react-bootstrap';
import styles from './MielCard.module.css';
import honeyJar from "./honeyJar.jpg";

function MielCard (){
return (
<Card border="warning"  style={{ width: '18rem' }}>
  <Card.Img variant="top" src={honeyJar} />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link className={styles.CardLink} href="#">Akacia</Card.Link>
  </Card.Body>
</Card>
);
}

export default MielCard;