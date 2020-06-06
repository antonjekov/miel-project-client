import * as yup from 'yup';
import { Form, Button, Col, Image } from 'react-bootstrap';
import styles from './AddProduct.module.css';
import React, { useState } from 'react';

function AddProduct(props) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('available');
    const [errorMessage, setErrorMessage] = useState()
    const [file, setFile] = useState('')
    const [imagePreviewUrl, setimagePreviewUrl] = useState('')

    const handleImageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            setFile(file)
            setimagePreviewUrl(reader.result)
        }

    }


    const handlerName = (event) => {
        setName(event.target.value);
    }

    const handlerCategory = (event) => {
        setCategory(event.target.value);
    }

    const handlerSubcategory = (event) => {
        setSubcategory(event.target.value);
    }


    const handlerPrice = (event) => {
        setPrice(event.target.value);
    }

    const handlerAvailability = (event) => {
        setAvailability(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        productSchema.validate({ name: name, category: category, subcategory: subcategory, price: price, availability: availability })
            .then(setErrorMessage(undefined))
            .catch(err => {
                if (err.name === 'ValidationError') {
                    setErrorMessage(err.errors)
                    return
                }

                // this.setState({ errorMessage: err.message })
            });
    }

    const productSchema = yup.object().shape({
        name: yup
            .string()
            .max(100, "Product name is too long. Must be max 100 chars")
            .min(3, "Product name is too short. Must be min 3 chars")
            .required("Product name is Required."),
        price: yup
            .number()
            .required("Price is Required.")
            .max(100, "Price is too big. Must be max 100.00 EUR")
            .min(0, "Price must be greater or equal to 0.00 EUR"),
        category: yup
            .string()
            .required("Product category is Required"),
        subcategory: yup
            .string()
            .required("Product subcategory is Required"),
        availability: yup
            .string()
            .required("Availability is Required"),

    })

    const haveError = !!errorMessage


    return (
        <div className={styles.AddProduct}>
            {haveError ? <p>{errorMessage}</p> : null}
            <div>
                <h1>
                    Add Product
                </h1>
            </div>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Group >
                            <Form.Label>Product name</Form.Label>
                            <Form.Control className={styles['form-control']} type="text" placeholder="Product name" value={name} onChange={handlerName} />
                        </Form.Group>
                    </Col>

                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Group >
                            <Form.Label>Category</Form.Label>
                            <Form.Control className={styles['form-control']} as="select" value={category} onChange={handlerCategory}>
                                <option></option>
                                <option>HONEY</option>
                                <option>APITHERAPY</option>
                                <option>COSMETIC</option>
                                <option>OTHER BEE PRODUCTS</option>

                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Subcategory</Form.Label>
                            <Form.Control className={styles['form-control']} as="select" value={subcategory} onChange={handlerSubcategory}>
                                <option></option>
                                <option>Mountain</option>
                                <option>Flowers</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Price</Form.Label>
                            <Form.Control className={styles['form-control']} type="number" value={price} onChange={handlerPrice} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>Availability</Form.Label>
                            <Form.Control className={styles['form-control']} as="select" value={availability} onChange={handlerAvailability}>
                                <option></option>
                                <option>Available</option>
                                <option>Not available</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row>

                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Form.File.Label>Product image upload</Form.File.Label>
                        <Form.File onChange={handleImageChange}></Form.File>
                        <Image src={imagePreviewUrl} height="171" width="180" thumbnail />
                    </Form.Group>
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

export default AddProduct