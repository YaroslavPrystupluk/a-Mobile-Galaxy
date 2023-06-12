import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { schema as validationSchema } from "./Schema";
import Field from "../../../../components/Form/Field/Field";
// eslint-disable-next-line import/named
import { InputWrapper } from "../../ProfileMenuBlocks/EditProfile/styled";
import {
	fetchUpdateCustomerInfo,
	removeMessage,
} from "../../../../store/reducers/updateUserInfoSlice";
import ToastNotification from "../../../../components/ToastNotification";
import Spinner from "../../../../components/Spinner";

const UserInfoForm = () => {
	const dispatch = useDispatch();
	const message = useSelector((state) => state.customerInfo.message);
	const { loading } = useSelector((state) => state.customer.meta);
	const initialValues = useSelector((state) => state.customer.customer);
	const formik = useFormik({
		initialValues: {
			firstName: initialValues.firstName || "",
			lastName: initialValues.lastName || "",
			email: initialValues.email || "",
			telephone: initialValues.telephone || "",
		},
		enableReinitialize: true,
		onSubmit: (usersData) => {
			dispatch(fetchUpdateCustomerInfo(usersData));
			setTimeout(() => {
				dispatch(removeMessage());
			}, 3000);
		},
		validationSchema,
	});
	const { values, errors, touched } = formik;
	if (loading) return <Spinner />;
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
			}}
			style={{
				display: "flex",
				justifyContent: "flex-start",
				flexDirection: "column",
				gap: "40px",
			}}
		>
			{message && <ToastNotification text="Ваші дані успішно змінені" />}
			<InputWrapper>
				<Field
					name="firstName"
					type="text"
					description="First Name"
					value={values.firstName}
					onChange={formik.handleChange}
					errors={touched.firstName && errors.firstName}
				/>
				<Field
					name="lastName"
					type="text"
					description="Last Name"
					value={values.lastName}
					onChange={formik.handleChange}
					errors={touched.lastName && errors.lastName}
				/>
				<Field
					name="email"
					type="email"
					description="Email"
					value={values.email}
					onChange={formik.handleChange}
					errors={touched.email && errors.email}
				/>
				<Field
					name="telephone"
					type="tel"
					description="Mobile"
					value={values.telephone}
					onChange={formik.handleChange}
					errors={touched.telephone && errors.telephone}
				/>
			</InputWrapper>
			<div className="submit__btn__container">
				<button className="submit__btn" type="submit">
					Зберегти зміни
				</button>
			</div>
		</form>
	);
};
// UserInfoForm.defaultProps = {
// 	email: undefined,
// 	firstName: undefined,
// 	lastName: undefined,
// 	telephone: undefined,
// };
// UserInfoForm.propTypes = {
// 	email: PropTypes.string,
// 	firstName: PropTypes.string,
// 	lastName: PropTypes.string,
// 	telephone: PropTypes.string,
// };
export default UserInfoForm;
