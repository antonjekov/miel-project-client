import * as yup from 'yup';

const messageSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is Required.")
        .max(50, "Name too long")
        .min(3, "Name too short"),
    email: yup
        .string()
        .email("Please fill a valid email address")
        .required("Email is Required."),
    message: yup
        .string()
        .required("Message is Required.")
        .max(500, "Message too long")
    })

export default messageSchema

