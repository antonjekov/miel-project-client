import React, { Fragment } from 'react'
import styles from './index.module.css';
import PropTypes from 'prop-types';
function UnSuccessMessage({show, message}){
    return(
        <Fragment>
        {show?<div className={styles.UnSuccessMessage}><p dangerouslySetInnerHTML={{__html: message}}></p></div>:null}
        </Fragment>
    )
}

UnSuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
  }

export default UnSuccessMessage