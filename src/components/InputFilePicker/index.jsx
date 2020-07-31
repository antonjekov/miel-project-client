import React, { Fragment } from 'react'
import styles from './index.module.css'

function InputFilePicker(props) {

    return (<Fragment>
        <label htmlFor="filePicker" className={styles.filePicker} >{props.text}</label>
        <input onChange={props.onChange} id="filePicker" style={{ visibility: "hidden" }} type={"file"} accept="image/*"></input>
    </Fragment>)
}

export default InputFilePicker