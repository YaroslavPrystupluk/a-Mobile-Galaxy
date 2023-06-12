import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { schema as validationSchema, validationSchema2 } from "./Schema";
import Field from "./Field/Field";
import "./Form.scss";
import { fetchAuth, fetchRegister, setIsAuth } from "../../store/reducers/authSlice";
// eslint-disable-next-line import/named
import { addMessage } from "../../store/reducers/updateUserInfoSlice";
import ToastNotification from "../ToastNotification";
import Spinner from "../Spinner";

const PageForm = ({ status, onClose, onLoginToggle, onRegisterToggle }) => {
	const dispatch = useDispatch();
	const { error } = useSelector((state) => state.auth.meta);
	const { loading } = useSelector((state) => state.auth.meta);
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			login: "",
			telephone: "",
		},
		onSubmit: async (usersData) => {
			if (status === "LOGIN") {
				const { email, password } = usersData;
				const res = await dispatch(fetchAuth({ loginOrEmail: email, password }));
				if (res.payload.token) {
					dispatch(setIsAuth(true));
				}
				if (!error) {
					onClose();
				} else {
					onLoginToggle();
				}
			} else {
				dispatch(fetchRegister(usersData));
				onLoginToggle();
			}
		},
		...(status === "REGISTER" ? { validationSchema } : { validationSchema2 }),
	});
	const { values, errors, touched } = formik;
	return (
		<form
			className="form"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
			}}
		>
			<div className="form__title">
				<span onClick={onLoginToggle} className={`login ${status === "LOGIN" ? "active" : ""}`}>
					Увійти
				</span>
				<span
					onClick={onRegisterToggle}
					className={`register ${status === "REGISTER" ? "active" : ""}`}
				>
					Реєстрація
				</span>
			</div>
			<div className="login__legend">
				Будь ласка, введіть дані свого облікового запису, щоб увійти
			</div>
			<div className="inputs__wrapper">
				{status === "REGISTER" && (
					<Field
						name="firstName"
						type="text"
						description="First Name"
						value={values.firstName}
						onChange={formik.handleChange}
						errors={touched.firstName && errors.firstName}
					/>
				)}
				{status === "REGISTER" && (
					<Field
						name="lastName"
						type="text"
						description="Last Name"
						value={values.lastName}
						onChange={formik.handleChange}
						errors={touched.lastName && errors.lastName}
					/>
				)}
				{status === "REGISTER" && (
					<Field
						name="telephone"
						type="tel"
						description="Mobile phone"
						value={values.telephone}
						onChange={formik.handleChange}
						errors={touched.telephone && errors.telephone}
					/>
				)}
				{status === "REGISTER" && (
					<Field
						name="login"
						type="text"
						description="User name"
						value={values.login}
						onChange={formik.handleChange}
						errors={touched.login && errors.login}
					/>
				)}
				<Field
					name="email"
					type="email"
					description="Email"
					value={values.email}
					onChange={formik.handleChange}
					errors={touched.email && errors.email}
				/>
				<Field
					name="password"
					type="password"
					description="Password"
					value={values.password}
					onChange={formik.handleChange}
					errors={touched.password && errors.password}
				/>
				{error && <ToastNotification text={error} />}
			</div>
			<div className="submit__btn__container">
				{loading && <Spinner />}
				{!loading && (
					<button className="submit__btn" type="submit">
						{status === "LOGIN" ? "Увійти" : "Зареєструватися"}
					</button>
				)}
			</div>
		</form>
	);
};
PageForm.propTypes = {
	status: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	//
	onLoginToggle: PropTypes.func,
	//
	onRegisterToggle: PropTypes.func,
};
export default PageForm;
