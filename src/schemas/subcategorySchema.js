import * as yup from 'yup';

const subcategorySchema = yup.object().shape({
    category: yup
        .string()
        .required("Product category is Required"),
        
    subcategory: yup
        .string()
        .max(50, "Subcategory name must be max 50 chars")
        .min(3, "Subcategory name must be min 3 chars")
        .required("Product subcategory is Required"),

    description: yup
        .string()
        .max(200, "Description too long.")
        .min(3, "Description too short.")
        .required(true, "Description is Required"),
});

export default subcategorySchema