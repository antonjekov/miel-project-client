import { Form, Button, Col, Image, Spinner } from 'react-bootstrap';
import styles from './AddProduct.module.css';
import React, { useState, useCallback } from 'react';
import { useFormik } from "formik";
import productSchema from "../schemas/productSchema";
import { useDropzone } from 'react-dropzone'
import productService from "../services/product_service";
const CLOUDINARY_UPLOAD_PRESET = 'k21wtmfa';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mielproject/image/upload';

function AddProductFormic(props) {
    //Other hooks
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {
            name: '',
            category: '',
            subcategory: '',
            price: 0,
            availability: '',
        },
        validationSchema: productSchema,
        onSubmit(values, actions) {
            if (uploadedFileCloudinaryUrl === '') {
                SetImageUrlError('Image is required!')
                return
            }
            values['imageUrl'] = uploadedFileCloudinaryUrl;
            productService.add(values).then(async res => {
                if (!res.ok) {
                    setIsLoading(false);
                    const errorsObject = await res.json()
                    actions.setErrors(errorsObject)
                    return
                }
                setIsLoading(false);
                // const userInfo = await res.json();
                // props.setUserName(userInfo.name);
                // setLoginSuccess(true);
            })
                .catch(err => {
                    console.log(err)//TO DO Must have global handler page for Server errors ...
                });;
            console.log(values);
        }
    });
    //Dropzone integration hook
    const onDrop = useCallback(acceptedFiles => {
        handleImageUpload(acceptedFiles[0]);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/png', multiple: false, onDrop
    })
    

    const handleImageUpload = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        setIsLoading(true);
        fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.secure_url !== '') {
                    SetUploadedFileCloudinaryUrl(data.secure_url);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                SetImageUrlError('File to upload image. Please try again.');
                setIsLoading(false)
            });
    }

    return (
        <div className={styles.AddProduct}>
            <div>
                <h1>
                    Add Product
                </h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Col>
                        <Form.Group >
                            <Form.Label>Product name</Form.Label>
                            <Form.Control className={styles['form-control']} type="text" placeholder="Product name" name='name' value={values.name} onChange={handleChange} isInvalid={!!errors.name} isValid={values.name && !errors.name} />
                            <Form.Control.Feedback type='invalid' >{errors.name}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Group >
                            <Form.Label>Category</Form.Label>
                            <Form.Control className={styles['form-control']} as="select" value={values.category} name='category' onChange={handleChange} isInvalid={!!errors.category} isValid={values.category && !errors.category}>
                                <option></option>
                                <option>HONEY</option>
                                <option>APITHERAPY</option>
                                <option>COSMETIC</option>
                                <option>OTHER BEE PRODUCTS</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' >{errors.category}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Subcategory</Form.Label>
                            <Form.Control className={styles['form-control']} as="select" value={values.subcategory} name='subcategory' onChange={handleChange} isInvalid={!!errors.subcategory} isValid={values.subcategory && !errors.subcategory}>
                                <option></option>
                                <option>Mountain</option>
                                <option>Flowers</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' >{errors.subcategory}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Price</Form.Label>
                            <Form.Control className={styles['form-control']} type="number" name='price' value={values.price} onChange={handleChange} isInvalid={!!errors.price} isValid={values.price && !errors.price} />
                        </Form.Group>
                        <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Availability</Form.Label>
                            <Form.Control className={styles['form-control']} as="select" name='availability' value={values.availability} onChange={handleChange} isInvalid={!!errors.availability} isValid={values.availability && !errors.availability}>
                                <option></option>
                                <option>Available</option>
                                <option>Not available</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' >{errors.availability}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <div>
                            <div className={styles['drop-zone']} {...getRootProps()}>
                                <input  {...getInputProps()} />
                                Click to select image or drag it here.
                            </div>
                            <br></br>
                            <div>
                                {isLoading ? <Spinner animation="border" variant="warning" /> : null}
                                {uploadedFileCloudinaryUrl === '' ? null :
                                    <div>
                                        <Image src={uploadedFileCloudinaryUrl} height="160" width="160" thumbnail />
                                    </div>}
                            </div>
                            <br></br>
                        </div>
                    </Col>
                    <Col>
                        <Form.Control disabled={true} className={styles['form-control']} type="text" placeholder="Image Url" value={uploadedFileCloudinaryUrl} isInvalid={!uploadedFileCloudinaryUrl} isValid={uploadedFileCloudinaryUrl} />
                        <Form.Control.Feedback type='invalid' >{imageUrlError}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Button variant="warning" type="submit">
                            Add Product
                        </Button>
                    </Col>

                </Form.Row>
            </Form>
        </div>
    );
}

export default AddProductFormic