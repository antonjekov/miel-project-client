import * as yup from 'yup';

const userSchemaLogin = yup.object().shape({
    username: yup
        .string()
        .email("Please Enter an valid Email")
        .required("Email is Required."),
    password: yup
        .string()
        .required("Password is Required.")
        .max(13, "Password too long")
        .min(6, "Password too short")
    })

export default userSchemaLogin

