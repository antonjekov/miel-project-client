import React, { Fragment } from "react";
import styles from "./index.module.css";

function ProductPrice(props) {
    const { availability, price, discount } = props.product
    const style = props.styled&&styles.Price
    const isAvailable = availability.toLowerCase() === 'available'
    const isDescounted = !discount
    const finalPrice = `${(price - (discount?discount / 100 * price:0)).toFixed(2)} €`;
    return (
        <Fragment>
            {isAvailable ?
                isDescounted ?
                    <span className={style}>{finalPrice}</span> :
                    <span><s>{`${price?.toFixed(2)} €`}</s> <span className={style}>{finalPrice}</span></span> :
                ''}
        </Fragment>
    )
}

export default ProductPrice