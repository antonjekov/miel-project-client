import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button, Col, Image, Spinner } from 'react-bootstrap';
import productSchema from "../../schemas/productSchema";
import productService from "../../services/product_service";
import claudinaryService from "../../services/claudinaryService";
import InputFilePicker from "../InputFilePicker"

function EditProductPage(props) {
    const productId = props.match.params.id;
    const [product, setProduct] = useState({})
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()
    useEffect(() => {
        async function fetchData() {
            const result = await productService.getAll(productId)
            if (!result.ok) {
                return
            }
            const productInfo = await result.json()
            values.name = productInfo.name
            values.price = productInfo.price
            values.availability = productInfo.availability
            values.category=productInfo.category
            values.subcategory=productInfo.subcategory
            SetUploadedFileCloudinaryUrl(productInfo.imageUrl)
            setProduct(productInfo)
        }
        fetchData()
    }, [productId])


    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {
            name: '',
            category: '',
            subcategory: '',
            price: 0,
            availability: '',
            imageUrl: ''
        },
        validationSchema: productSchema,
        onSubmit(values, actions) {
            if (uploadedFileCloudinaryUrl === '') {
                SetImageUrlError('Image is required!')
                return
            }
            values['imageUrl'] = uploadedFileCloudinaryUrl;
            productService.edit({...product,...values}).then(async res => {
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
                history.goBack()
            })
                .catch(err => {
                    // What must happen if have server error
                    return
                });
        }
    });

    const handleImageUpload = async (file) => {
        setIsLoading(true);
        const { url, error } = await claudinaryService.upload(file)
        if (url) {
            uploadedFileCloudinaryUrl&&claudinaryService.delete(uploadedFileCloudinaryUrl);
            SetUploadedFileCloudinaryUrl(url);
        }
        if (error) {
            SetImageUrlError(error);
        }
        setIsLoading(false)
    }

    const buttonDisabled = (!!Object.keys(errors).length) || (values.name === '')

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <div >
                <h1>Edit Product</h1>
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
                            <Form.Group >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name='price' value={values.price} onChange={handleChange} isInvalid={!!errors.price} isValid={values.price && !errors.price} />
                            </Form.Group>
                            <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Availability</Form.Label>
                                <Form.Control as="select" name='availability' value={values.availability} onChange={handleChange} isInvalid={!!errors.availability} isValid={values.availability && !errors.availability}>
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
                                <InputFilePicker text="Click to change product image" onChange={(event) => handleImageUpload(event.target.files[0])} />
                                {isLoading ? <Spinner animation="border" variant="warning" /> : null}
                                {uploadedFileCloudinaryUrl === '' ? null :
                                    <div>
                                        <Image src={uploadedFileCloudinaryUrl} height="160" width="160" thumbnail />
                                    </div>}
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
                                Edit Product
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>
                <br></br>
            </div>
        </Col>

    )
}

export default EditProductPage