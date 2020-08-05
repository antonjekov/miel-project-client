import React from 'react'
import styles from './index.module.css'

function FormContentWrapper({ title, children }) {
    return (
        <div className={styles.FormWrapper}>
            <h1>{title}</h1>
            {children}
        </div>
    )
}

export default FormContentWrapper

