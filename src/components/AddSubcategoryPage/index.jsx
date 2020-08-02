import React, { useState} from 'react';
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import claudinaryService from "../../services/claudinaryService";
import subcategoryService from "../../services/subcategory_service";
import subcategorySchema from "../../schemas/subcategorySchema";
import { Form, Button, Col, Image, Spinner, Alert } from 'react-bootstrap';
import styles from './index.module.css';
import InputFilePicker from "../InputFilePicker"


function AddSubcategory(props) {

    //Other hooks
    const { categories } = useAuth();
    const history = useHistory()
    const [uploadedFileCloudinaryUrl, SetUploadedFileCloudinaryUrl] = useState('');
    const [imageUrlError, SetImageUrlError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
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
                    setTimeout(() => { setShow(false) }, 3000)
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

    let categoryOptions = categories.map(category => <option key={category._id}>{category.name}</option>)
    const buttonDisabled = (!!Object.keys(errors).length) || (values.category === '')

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <div className={styles.AddSubcategory}>
                <h1>
                    Add Subcategory
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Group >
                                <Form.Label>Category</Form.Label>
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
                                <Form.Control type="text" placeholder="Subcategory name" value={values.subcategory} name='subcategory' onChange={handleChange} isInvalid={!!errors.subcategory} isValid={values.subcategory && !errors.subcategory}>
                                </Form.Control>
                                <Form.Control.Feedback type='invalid' >{errors.subcategory}</Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Group >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" value={values.description} name='description' onChange={handleChange} isInvalid={!!errors.description} isValid={values.description && !errors.description}>
                                </Form.Control>
                                <Form.Control.Feedback type='invalid' >{errors.description}</Form.Control.Feedback>
                                <Form.Control.Feedback type='valid'>Look's good</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <div>                                
                            <InputFilePicker text="Click to add subcategory image" onChange={(event) => handleImageUpload(event.target.files[0])}/>
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
                                Add Subcategory
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>

                <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible='true'>
                    <Alert.Heading>Subcategory successfuly added !</Alert.Heading>
                </Alert>
            </div>
        </Col>
    );
}

export default AddSubcategory