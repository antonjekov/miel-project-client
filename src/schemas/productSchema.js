import * as yup from 'yup';

const productSchema = yup.object().shape({
    name: yup
        .string()
        .max(60, "Product name must be max 100 chars")
        .min(3, "Product name must be min 3 chars")
        .required("Product name is Required."),
    price: yup
        .number()
        .max(100, "Price must be max 100.00 EUR")
        .min(0, "Price must be greater or equal to 0.00 EUR")
        .required("Price is Required."),
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

export default productSchema