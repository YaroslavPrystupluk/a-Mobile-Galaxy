import * as yup from "yup";

const REQUIRED = "This field is required to fill in";

export const schema = yup.object().shape({
	firstName: yup
		.string()
		.required(REQUIRED)
		.matches(/^[a-zA-Zа-яА-Я]+$/, "Allowed characters for First Name is a-z, A-Z, а-я, А-Я.")
		.min(2, "First Name must be at least 2 characters.")
		.max(25, "First Name must be at most 25 characters."),
	lastName: yup
		.string()
		.required(REQUIRED)
		.matches(/^[a-zA-Zа-яА-Я]+$/, "Allowed characters for Last Name is a-z, A-Z, а-я, А-Я.")
		.min(2, "Last Name must be at least 2 characters.")
		.max(25, "Last Name must be at most 25 characters."),
	login: yup
		.string()
		.matches(/^[a-zA-Z0-9]+$/, "Allowed characters for login is a-z, A-Z, 0-9.")
		.min(3, "Login must be at least 3 characters.")
		.max(10, "Login must be at most 10 characters.")
		.required(REQUIRED),
	email: yup.string().email("That is not a valid email.").required(REQUIRED),
	telephone: yup
		.string()
		.matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/, "That is not a valid phone number."),
	password: yup
		.string()
		.matches(/^[a-zA-Z0-9]+$/, "Allowed characters for password is a-z, A-Z, 0-9.")
		.min(7, "Password must be at least 7 characters.")
		.max(30, "Password must be at most 30 characters.")
		.required(REQUIRED),
});
export const validationSchema2 = yup.object().shape({
	email: yup.string().email("That is not a valid email.").required(REQUIRED),
	password: yup
		.string()
		.matches(/^[a-zA-Z0-9]+$/, "Allowed characters for password is a-z, A-Z, 0-9.")
		.min(7, "Password must be at least 7 characters.")
		.max(30, "Password must be at most 30 characters.")
		.required(REQUIRED),
});
