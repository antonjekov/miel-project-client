import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button, Col } from 'react-bootstrap';
import productSchema from "../../schemas/productSchema";
import productService from "../../services/product_service";
import claudinaryService from "../../services/claudinaryService";
import FormContentWrapper from "../FormContentWrapper"
import InputFilePicker from "../InputFilePicker"
import PriceInput from '../PriceInput';
import DiscountInput from '../DiscountInput';
import NameInput from "../NameInput"
import AvailabilityInput from '../AvailabilityInput';

function EditProductPage(props) {
    const productId = props.match.params.id;
    const [product, setProduct] = useState({})
    const [imageUrl, SetImageUrl] = useState('');
    const [inicialImageUrl, SetInicialImageUrl] = useState('');
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
            values.category = productInfo.category
            values.subcategory = productInfo.subcategory
            values.discount = productInfo.discount
            SetImageUrl(productInfo.imageUrl)
            SetInicialImageUrl(productInfo.imageUrl)
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
            discount: 0,
            availability: '',
            imageUrl: ''
        },
        validationSchema: productSchema,
        onSubmit(values, actions) {
            values['imageUrl'] = imageUrl;
            productService.edit({ ...product, ...values }).then(async res => {
                if (res.status === 401) {
                    history.push('/login')
                    return
                }
                if (res.status === 422) {
                    const errorsObject = await res.json()
                    actions.setErrors(errorsObject)
                    return
                }
                history.goBack()
            })
                .catch(err => {
                    // What must happen if have server error
                    return
                });
        }
    });

    const buttonDisabled = (!!Object.keys(errors).length) || (values.name === '') || imageUrl === ''

    const handleCancel = ()=>{
        imageUrl!==inicialImageUrl && claudinaryService.delete(imageUrl);
        history.goBack()}

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <FormContentWrapper title='Edit Product'>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <NameInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <PriceInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <DiscountInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                        <Col>
                            <AvailabilityInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <InputFilePicker text="Click to add product image" setImageUrl={SetImageUrl} imageUrl={imageUrl} />
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Button variant="danger" type="submit" disabled={buttonDisabled}>            Edit product</Button>
                        </Col>
                        <Col><Button onClick={handleCancel} variant="warning">Cancel</Button></Col>
                    </Form.Row>
                </Form>
                </FormContentWrapper>
        </Col>
    )
}

export default EditProductPage