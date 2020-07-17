import { Form, Button, Col, Image, Spinner, Alert } from 'react-bootstrap';
import styles from './AddProduct.module.css';
import React, { useState, useCallback, useEffect } from 'react';
import { useFormik } from "formik";
import productSchema from "../schemas/productSchema";
import { useDropzone } from 'react-dropzone'
import productService from "../services/product_service";
import { useAuth } from "../contexts/Auth";
import claudinaryService from "../services/claudinaryService";

function AddProductFormic(props) {

    //Other hooks
    const { categories } = useAuth();
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [subcategoryOptions, setSubcategoryOptions] = useState(null);
    const [show, setShow] = useState(false);

    //Formik integration hook
    const { handleSubmit, handleChange, errors, values, setFieldValue } = useFormik({
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
                actions.resetForm();
                SetUploadedFileCloudinaryUrl('')
                setShow(true)
            })
                .catch(err => {
                    console.log(err)//TO DO Must have global handler page for Server errors ...
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

    useEffect(() => {
        //Clear value for prevent to be choosed subcategory that not exist if we change category.
        setFieldValue("subcategory", '')
        async function fetchData() {
            let result = categories.find(x => x.name === values.category)
            if (result) {
                const options = result.subcategories.map(x => <option key={x._id}>{x.name}</option>)
                setSubcategoryOptions(options);
            }
        }
        fetchData()
    }, [values.category, categories, setFieldValue])

    let categoryOptions = categories.map(category => <option key={category._id}>{category.name}</option>)

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <div className={styles.AddProduct}>
                <h1>Add Product</h1>
                <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible='true'>
                    <Alert.Heading>Product successfuly added !</Alert.Heading>
                </Alert>
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
                                    {categoryOptions}
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
                                    {subcategoryOptions}
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
        </Col>

    );
}

export default AddProductFormic