import React, { Fragment } from 'react'
import styles from './index.module.css';

function DiscountCircle(props) {
    const discount = props.discount
    return (
        <Fragment>
            {discount ? <div className={styles.Circle} > -{discount} %</div > : ''}
        </Fragment>
    )
}

export default DiscountCircle