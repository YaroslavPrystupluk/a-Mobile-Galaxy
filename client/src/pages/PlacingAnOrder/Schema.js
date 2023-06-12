import * as yup from "yup";

const REQUIRED = "This field is required to fill in";
const phoneRegExp = /\+?[1-9][0-9]{9,14}/g;

export const schema = yup.object().shape({
	fullName: yup.string().required(REQUIRED),
	email: yup.string().email("Enter a valid email").required("Email is required"),
	phoneNumber: yup
		.string()
		.matches(phoneRegExp, "Phone must begin with +38")
		.nullable()
		.required(REQUIRED),
	adress: yup.string().nullable().required("Adress is required"),
});
