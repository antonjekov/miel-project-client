import React from 'react';
import styles from './Miel.module.css';
import logo from "./honey.jpg";
import MielCard from "../MielCard/MielCard";
import { CardColumns } from 'react-bootstrap';

function Miel() {
    return (
        <div className={styles.Miel}>
            <div className={styles.CategoryImage}>
                <img src={logo} alt="Miel"></img>
            </div>
            <CardColumns>
                <MielCard />
                <MielCard />
                <MielCard />
                <MielCard />
                <MielCard />
            </CardColumns>
        </div >);
}

export default Miel;