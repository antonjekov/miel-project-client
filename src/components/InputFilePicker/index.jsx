import React, { Fragment, useState, useEffect } from 'react'
import { Col, Form, Image, Spinner } from 'react-bootstrap';
import claudinaryService from "../../services/claudinaryService";
import styles from './index.module.css'

function InputFilePicker(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('Image is required!')

    useEffect(() => {
        SetUploadedFileCloudinaryUrl(props.imageUrl || '')
    }, [props.imageUrl])

    const handleImageUpload = async (file) => {
        setIsLoading(true);
        const { url } = await claudinaryService.upload(file)
        if (url) {
            uploadedFileCloudinaryUrl && claudinaryService.delete(uploadedFileCloudinaryUrl);
            SetUploadedFileCloudinaryUrl(url);
            props.setImageUrl(url)
            SetImageUrlError('')
        }
        setIsLoading(false)
    }

    return (<Fragment>
        <Col md={9}>
            <Form.Group >
                <Form.Control disabled={true} name="imageUrl" type="text" placeholder="Image Url" value={uploadedFileCloudinaryUrl} isInvalid={!uploadedFileCloudinaryUrl} isValid={uploadedFileCloudinaryUrl} />
                <Form.Control.Feedback type='invalid' >{imageUrlError}</Form.Control.Feedback>
                <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
            </Form.Group>
            <label htmlFor="filePicker" className={styles.filePicker} >{props.text}</label>
            <input onChange={(event) => handleImageUpload(event.target.files[0])} id="filePicker" style={{ visibility: "hidden" }} type={"file"} accept="image/*"></input>
            {isLoading ? <Spinner animation="border" variant="warning" /> : null}
        </Col>

        <Col>
            {uploadedFileCloudinaryUrl === '' ? null :
                <Image className={styles.image} src={uploadedFileCloudinaryUrl} thumbnail />}
        </Col>
    </Fragment>)
}

export default InputFilePicker