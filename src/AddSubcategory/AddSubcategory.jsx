import { Form, Button, Col, Image, Spinner, Alert } from 'react-bootstrap';
import styles from './AddSubcategory.module.css';
import React, { useState, useCallback, useEffect } from 'react';
import { useFormik } from "formik";
import subcategorySchema from "../schemas/subcategorySchema";
import categoryService from "../services/category_service";
import subcategoryService from "../services/subcategory_service";
import { useDropzone } from 'react-dropzone'
import { useAuth } from "../contexts/Auth";
import { Redirect } from "react-router-dom";


const CLOUDINARY_UPLOAD_PRESET = 'k21wtmfa';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mielproject/image/upload';
function AddSubcategory(props) {

    //Other hooks
    const contextAuth = useAuth();
    console.log(contextAuth)
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);

    //Formik integration hook
    const { handleSubmit, handleChange, errors, values} = useFormik({
        initialValues: {
            category: '',
            subcategory: '',
            description: ''
        },
        validationSchema: subcategorySchema,
        onSubmit(values, actions) {
            if (uploadedFileCloudinaryUrl === '') {
                SetImageUrlError('Image is required!')
                return
            }
            values['imageUrl'] = uploadedFileCloudinaryUrl;

            subcategoryService.add(values)
                .then(async res => {
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
            console.log(values);
        }
    });

    //Dropzone integration hook
    const onDrop = useCallback(acceptedFiles => {
        handleImageUpload(acceptedFiles[0]);
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
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


    //useEffect hooks
    useEffect(() => {
        function fetchData() {
            categoryService.getAll().then(res => res.json()).then(res => setCategories(res))
        }
        fetchData()
    }, [])

    let categoryOptions = categories.map(category => <option key={category._id}>{category.name}</option>)

    if (!contextAuth) {
        return <Redirect to="/login" />
    }

    return (
        <Col md={{ offset: 3, span: 6 }}>
        <div className={styles.AddSubcategory}>
            <div>
                <h1>
                    Add Subcategory
                </h1>
            </div>
            <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible='true'>
                <Alert.Heading>Category successfuly added !</Alert.Heading>
            </Alert>
            <Form onSubmit={handleSubmit}>
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
                            <Form.Control className={styles['form-control']} type="text" placeholder="Subcategory name" value={values.subcategory} name='subcategory' onChange={handleChange} isInvalid={!!errors.subcategory} isValid={values.subcategory && !errors.subcategory}>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid' >{errors.subcategory}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Form.Row>

                <Form.Row>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control className={styles['form-control']} type="text" placeholder="Description" value={values.description} name='description' onChange={handleChange} isInvalid={!!errors.description} isValid={values.description && !errors.description}>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid' >{errors.description}</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                    </Form.Group>
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
                            Add Subcategory
                        </Button>
                    </Col>

                </Form.Row>
            </Form>
        </div>
        </Col>
    );
}

export default AddSubcategory