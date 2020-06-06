import * as yup from 'yup';

const userSchema = yup.object().shape({
    username: yup
        .string()
        .email("Please Enter an valid Email")
        .required("Email is Required."),
    name: yup
        .string()
        .max(50, "Name too long")
        .min(3, "Name too short")
        .required("Name is Required."),
    password: yup
        .string()
        .required("Password is Required.")
        .max(13, "Password too long")
        .min(6, "Password too short"),
    repassword: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required('Password confirm is required')
})

export default userSchema