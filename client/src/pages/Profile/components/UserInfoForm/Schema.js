import * as yup from "yup";

const REQUIRED = "This field is required to fill in";

export const schema = yup.object().shape({
	firstName: yup.string().required(REQUIRED),
	lastName: yup.string().required(REQUIRED),
	email: yup.string().required(REQUIRED),
	telephone: yup.string(),
});
export const validationSchemaForPasswordChange = yup.object().shape({
	password: yup.string().required(REQUIRED),
	newPassword: yup.string().min(7, "Password must be at least 8 characters").required(REQUIRED),
});
