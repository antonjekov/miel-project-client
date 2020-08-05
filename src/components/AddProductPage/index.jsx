import React, { useState } from 'react';
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { Form, Button, Col} from 'react-bootstrap';
import productSchema from "../../schemas/productSchema";
import productService from "../../services/product_service";
import claudinaryService from "../../services/claudinaryService";
import InputFilePicker from "../InputFilePicker"
import NameInput from "../NameInput"
import CategoryInput from '../CategoryInput';
import SubcategoryInput from '../SubcategoryInput';
import PriceInput from '../PriceInput';
import DiscountInput from '../DiscountInput';
import AvailabilityInput from '../AvailabilityInput';
import FormContentWrapper from '../FormContentWrapper';
import SuccessMessage from '../SuccessMessage';
function AddProduct(props) {

    //Other hooks
    const history = useHistory()
    const { categories } = useAuth();
    const [imageUrl, SetImageUrl] = useState('');
    const [show, setShow] = useState(false);

    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {
            name: '',
            category: '',
            subcategory: '',
            price: 0,
            discount: 0,
            availability: '',
        },
        validationSchema: productSchema,
        onSubmit(values, actions) {
            values['imageUrl'] = imageUrl;
            productService.add(values).then(async res => {
                if (res.status === 401) {
                    history.push('/login')
                    return
                }
                if (res.status === 422) {
                    const errorsObject = await res.json()
                    actions.setErrors(errorsObject)
                    return
                }
                actions.resetForm();
                SetImageUrl('')
                setShow(true)
                setTimeout(() => { setShow(false) }, 5000)
            })
                .catch(err => {
                    // What must happen if have server error
                    return
                });
        }
    });
    
    let categoryOptions = categories.map(category => <option key={category._id}>{category.name}</option>)
    let result = categories && categories.find(x => x.name === values.category)
    let subcategoryOptions = result && result.subcategories.map(x => <option key={x._id}>{x.name}</option>)

    const buttonDisabled = (!!Object.keys(errors).length) || (values.name === '')||imageUrl===''

    const handleCancel = ()=>{
        imageUrl && claudinaryService.delete(imageUrl);
        history.push('/')
    }

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <FormContentWrapper title='Add Product'>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <NameInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <CategoryInput values={values} errors={errors} handleChange={handleChange} categoryOptions={categoryOptions} />
                        </Col>
                        <Col>
                            <SubcategoryInput values={values} errors={errors} handleChange={handleChange} subcategoryOptions={subcategoryOptions} />
                        </Col>
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
                        <InputFilePicker text="Click to add product image" setImageUrl= {SetImageUrl} imageUrl={imageUrl}/>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Button variant="danger" type="submit" disabled={buttonDisabled}>            Add Product</Button>
                            
                        </Col>
                        <Col><Button onClick={handleCancel} variant="warning">Cancel</Button></Col>
                    </Form.Row>
                </Form>
                <SuccessMessage show={show} message='Product successfuly added !'/>
                
            </FormContentWrapper>
        </Col>);
}

export default AddProduct