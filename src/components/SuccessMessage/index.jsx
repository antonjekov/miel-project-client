import React, { Fragment } from 'react'
import styles from './index.module.css';
function SuccessMessage({show, message}){
    return(
        <Fragment>
        {show?<div className={styles.SuccessMessage}><p >{message}</p></div>:null}
        </Fragment>
    )
}

export default SuccessMessage