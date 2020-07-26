import { Form, Button, Col, Image, Spinner, Alert } from 'react-bootstrap';
import styles from './index.module.css';
import React, { useState, useCallback } from 'react';
import { useFormik } from "formik";
import productSchema from "../../schemas/productSchema";
import { useDropzone } from 'react-dropzone'
import productService from "../../services/product_service";
import { useAuth } from "../../contexts/Auth";
import claudinaryService from "../../services/claudinaryService";
import { useHistory } from "react-router-dom";

function AddProductFormic(props) {

    //Other hooks
    const history = useHistory()
    const { categories } = useAuth();
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

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
                if (res.status === 401) {
                    history.push('/login')
                    return
                }
                if (res.status === 422) {
                    setIsLoading(false);
                    const errorsObject = await res.json()
                    actions.setErrors(errorsObject)
                    return
                }                
                setIsLoading(false);
                actions.resetForm();
                SetUploadedFileCloudinaryUrl('')
                setShow(true)
                setTimeout(()=>{setShow(false)},3000)
            })
                .catch(err => {
                    // What must happen if have server error
                    return
                });
        }
    });
    //Dropzone integration hook
    const onDrop = useCallback(acceptedFiles => {
        handleImageUpload(acceptedFiles[0]);
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png', multiple: false, onDrop
    })

    const handleImageUpload = async (file) => {
        setIsLoading(true);
        const { url, error } = await claudinaryService.upload(file)
        setIsLoading(false)
        url && SetUploadedFileCloudinaryUrl(url);
        error && SetImageUrlError(error);
    }

    let categoryOptions = categories.map(category => <option key={category._id}>{category.name}</option>)
    let result =categories&& categories.find(x => x.name === values.category)
    let subcategoryOptions = result&&result.subcategories.map(x => <option key={x._id}>{x.name}</option>)
       
    const buttonDisabled = (!!Object.keys(errors).length)||(values.name==='')

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <div className={styles.AddProduct}>
                <h1>Add Product</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Group >
                                <Form.Label>Product name</Form.Label>
                                <Form.Control type="text" placeholder="Product name" name='name' value={values.name} onChange={handleChange} isInvalid={!!errors.name} isValid={values.name && !errors.name} />
                                <Form.Control.Feedback type='invalid' >{errors.name}</Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Group controlId="category">
                                <Form.Label >Category</Form.Label>
                                <Form.Control as="select" value={values.category} name='category' onChange={handleChange} isInvalid={!!errors.category} isValid={values.category && !errors.category}>
                                    <option></option>
                                    {categoryOptions}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid' >{errors.category}</Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Subcategory</Form.Label>
                                <Form.Control as="select" value={values.subcategory} name='subcategory' onChange={handleChange} isInvalid={!!errors.subcategory} isValid={values.subcategory && !errors.subcategory}>
                                    <option></option>
                                    {subcategoryOptions}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid' >{errors.subcategory}</Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Price</Form.Label>
                                <Form.Control  type="number" name='price' value={values.price} onChange={handleChange} isInvalid={!!errors.price} isValid={values.price && !errors.price} />
                            </Form.Group>
                            <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Availability</Form.Label>
                                <Form.Control  as="select" name='availability' value={values.availability} onChange={handleChange} isInvalid={!!errors.availability} isValid={values.availability && !errors.availability}>
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
                            <Form.Control disabled={true} type="text" placeholder="Image Url" value={uploadedFileCloudinaryUrl} isInvalid={!uploadedFileCloudinaryUrl} isValid={uploadedFileCloudinaryUrl} />
                            <Form.Control.Feedback type='invalid' >{imageUrlError}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Button variant="warning" type="submit" disabled={buttonDisabled}>
                                Add Product
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>
                <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible='true'>
                    <p>Product successfuly added !</p>
                </Alert>                
            </div>
        </Col>

    );
}

export default AddProductFormic