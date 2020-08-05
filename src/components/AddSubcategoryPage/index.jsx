import React, { useState } from 'react';
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import subcategoryService from "../../services/subcategory_service";
import claudinaryService from "../../services/claudinaryService";
import subcategorySchema from "../../schemas/subcategorySchema";
import { Form, Button, Col} from 'react-bootstrap';
import InputFilePicker from "../InputFilePicker"
import CategoryInput from '../CategoryInput';
import NameInput from '../NameInput';
import DescriptionInput from '../DescriptionInput';
import FormContentWrapper from "../FormContentWrapper"
import SuccessMessage from '../SuccessMessage';

function AddSubcategory(props) {

    //Other hooks
    const { categories } = useAuth();
    const history = useHistory()
    const [imageUrl, SetImageUrl] = useState('');
    const [show, setShow] = useState(false);

    //Formik integration hook
    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues: {
            category: '',
            name: '',
            description: ''
        },
        validationSchema: subcategorySchema,
        onSubmit(values, actions) {
            values['imageUrl'] = imageUrl;

            subcategoryService.add(values)
                .then(async res => {
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
                    setTimeout(() => { setShow(false) }, 3000)
                })
                .catch(err => {
                    // What must happen if have server error
                    return
                });
        }
    });

    let categoryOptions = categories.map(category => <option key={category._id}>{category.name}</option>)
    const buttonDisabled = (!!Object.keys(errors).length) || (values.category === '')

    const handleCancel = ()=>{
        imageUrl && claudinaryService.delete(imageUrl);
        history.push('/')}

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <FormContentWrapper title='Add Subcategory'>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col>
                            <CategoryInput values={values} errors={errors} handleChange={handleChange} categoryOptions={categoryOptions} />
                        </Col>
                        <Col>
                            <NameInput values={values} errors={errors} handleChange={handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <DescriptionInput values={values} errors={errors} handleChange={handleChange}/>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                    <InputFilePicker text="Click to subcategory image" setImageUrl= {SetImageUrl}/>
                    </Form.Row>

                    <Form.Row>
                        <Col><Button variant="danger" type="submit" disabled={buttonDisabled}>           Add Subcategory</Button></Col>
                        <Col><Button onClick={handleCancel} variant="warning">Cancel</Button></Col>                        
                    </Form.Row>
                </Form>
                <SuccessMessage show={show} message='Product successfuly added !'/> 
            </FormContentWrapper>
        </Col>
    );
}

export default AddSubcategory