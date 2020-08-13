import React, { Fragment } from 'react'
import styles from './index.module.css';
function UnSuccessMessage({show, message}){
    return(
        <Fragment>
        {show?<div className={styles.UnSuccessMessage}><p dangerouslySetInnerHTML={{__html: message}}></p></div>:null}
        </Fragment>
    )
}

export default UnSuccessMessage