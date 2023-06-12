import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
	Container,
	Grid,
	Box,
	Typography,
	TextField,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	Autocomplete,
} from "@mui/material";
import "./PlacingAnOrder.scss";
import CategoryTitle from "../../components/CategoryTitle";
import FillTheFromText from "./components/FillTheFormText/FillTheFormText";
import OrderItem from "../../components/OrderItem";
import { submitBtn } from "./sxStyles/submitBtn";
import { RGStyle } from "./sxStyles/RGStyle";
import { AdressesDataBase } from "./AdressesDataBase/AdressesDataBase";

import OrderPrice from "./components/OrderPrice/OrderPrice";
import { fetchProducts } from "../../store/reducers/productsSlice";
import { schema as validationSchema } from "./Schema";
import { createOrder } from "../../store/reducers/ordersSlice";
import { selectTotalCartSum } from "../../store/selectors/cart.selectors";
import { selectShoppingCart } from "../../store/selectors";
import { getTotatlAuthCartSum } from "../../store/reducers/cartSlice";
import Field from "../../components/Form/Field/Field";
import { setModal } from "../../store/reducers/modalSlice";
import useItemsToRender from "../Cart/hooks";
import useSendOrderInfo from "./hooks/useSendOrderInfo";
import { fetchCustomer } from "../../store/reducers/getCustomerInfoSlice";
import { Error } from "./components/Error/Error";

const PlacingAnOrder = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.auth.isAuth);
	const cartItems = useSelector(selectShoppingCart);
	const authCart = useSelector((state) => state.cart.shoppingCartAuth);
	const totalNotAuth = useSelector(selectTotalCartSum);
	const totalAuth = useSelector((state) => state.cart.cartAuthTotalSum);
	const [products, setProducts] = useState([]);
	const [shippingMethod, setShippingMethod] = useState("Кур’єром додому");
	const [paymentMethod, setPaymentMethod] = useState("Банківською карткою онлайн");
	const [adressTitle, setAdressTitle] = useState("Адреса");
	const initialValues = useSelector((state) => state.customer.customer);
	const { dataSent } = useSelector((state) => state.orders.meta);
	const [value, setValue] = useState(undefined || "");

	const countTotalPriceAuth = () => {
		const total = authCart.reduce((acc, item) => {
			const quantity = item.cartQuantity;
			const prodPrice = item.product.currentPrice;
			const itemTotal = quantity * prodPrice;
			return acc + itemTotal ?? 0;
		}, 0);
		return total;
	};
	useEffect(() => {
		if (!isLoggedIn) return;
		if (totalAuth === 0) {
			dispatch(getTotatlAuthCartSum(countTotalPriceAuth()));
		}
	}, [isLoggedIn, authCart]);

	const handleShippingMethodChange = (e) => {
		if (shippingMethod === "Кур’єром додому") {
			setAdressTitle("Пункт видачі");
		} else setAdressTitle("Адреса");
		setShippingMethod(e.target.value);
	};

	const handlePaymentMethodChange = (e) => {
		setPaymentMethod(e.target.value);
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const params = useItemsToRender(cartItems, setProducts);
		if (params === "_id=") return;
		dispatch(fetchProducts(params)).then((res) => {
			setProducts(res.payload.products);
		});
		// eslint-disable-next-line no-unused-expressions
		!isLoggedIn
			? localStorage.setItem("totalCartSum", totalNotAuth)
			: localStorage.setItem("totalCartSum", totalAuth);
	}, [cartItems, totalAuth, totalNotAuth]);

	const formik = useFormik({
		initialValues: {
			fullName: initialValues?.firstName || "",
			phoneNumber: initialValues?.telephone || "",
			email: initialValues?.email || "",
			adress: "",
		},
		onSubmit: (values) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const newOrder = useSendOrderInfo(
				values,
				initialValues,
				isLoggedIn,
				products,
				cartItems,
				shippingMethod,
				paymentMethod,
				isLoggedIn ? totalAuth : totalNotAuth,
			);
			dispatch(createOrder(newOrder));
			dispatch(setModal("SUCCESS"));
		},
		enableReinitialize: true,
		validationSchema,
	});
	const itemsToRender = !isLoggedIn
		? products?.map((item) => {
				const cartQuantity = cartItems[item._id];
				return <OrderItem key={item.itemNo} item={item} cartQuantity={cartQuantity} />;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  })
		: authCart?.map((item) => {
				return (
					<OrderItem
						key={item.product.itemNo}
						item={item.product}
						cartQuantity={item.cartQuantity}
					/>
				);
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  });
	const { values, errors, touched } = formik;
	return (
		<Container>
			<form className="form-wrapper" onSubmit={formik.handleSubmit}>
				<CategoryTitle text="Оформлення замовлення" />

				<Grid container spacing={{ xs: 2, md: 5, lg: 20 }}>
					<Grid item xs={12} sm={12} md={6}>
						<FillTheFromText />
						<Typography variant="h6">Контактні дані</Typography>
						<Box className="inputs-wrapper">
							<Field
								name="fullName"
								type="text"
								description="Ім’я одержувача"
								value={values.fullName}
								onChange={formik.handleChange}
								errors={touched.fullName && errors.fullName}
							/>
							<Field
								name="phoneNumber"
								type="text"
								description="Телефон"
								value={values.phoneNumber}
								onChange={formik.handleChange}
								errors={touched.phoneNumber && errors.phoneNumber}
							/>
							<Field
								name="email"
								type="text"
								description="E-mail"
								value={values.email}
								onChange={formik.handleChange}
								errors={touched.email && errors.email}
							/>
						</Box>
						<Typography sx={{ margin: "40px 0 20px" }} variant="h6">
							Доставка та оплата
						</Typography>
						<Grid container>
							<Grid item xs={6} md={5}>
								<Typography>Спосіб доставки</Typography>
								<RadioGroup
									aria-labelledby="demo-controlled-radio-buttons-group"
									name="controlled-radio-buttons-group"
									value={shippingMethod}
									onChange={handleShippingMethodChange}
								>
									<FormControlLabel
										sx={RGStyle}
										value="Кур’єром додому"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Кур’єром додому"
									/>
									<FormControlLabel
										sx={RGStyle}
										value="Самовивіз"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Самовивіз"
									/>
								</RadioGroup>
							</Grid>

							<Grid item xs={6} md={7}>
								<Typography>Спосіб розрахунку</Typography>
								<RadioGroup
									aria-labelledby="demo-controlled-radio-buttons-group"
									name="controlled-radio-buttons-group"
									value={paymentMethod}
									onChange={handlePaymentMethodChange}
								>
									<FormControlLabel
										sx={RGStyle}
										value="Банківською карткою онлайн"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Банківською карткою онлайн"
									/>
									<FormControlLabel
										sx={RGStyle}
										value="Готівкою або карткою при отриманні"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Готівкою або карткою при отриманні"
									/>
								</RadioGroup>
							</Grid>
						</Grid>

						<Typography sx={{ margin: "20px 0 10px" }}>{adressTitle}</Typography>
						{adressTitle === "Пункт видачі" ? (
							<Autocomplete
								disablePortal
								id="adress"
								name="adress"
								value={value}
								onChange={(event, targetValue) => {
									setValue(targetValue?.label || targetValue);
									formik.setFieldValue("adress", targetValue?.label || targetValue);
								}}
								defaultValue=""
								isOptionEqualToValue={(option, targetValue) => option.label === targetValue}
								options={AdressesDataBase}
								sx={{ width: "100%" }}
								renderInput={(params) => (
									<>
										<TextField
											{...params}
											fullWidth
											color="secondary"
											placeholder="Оберіть пункт видачі"
										/>
										{touched.adress && errors.adress ? (
											<Error>{touched.adress && errors.adress}</Error>
										) : null}
									</>
								)}
							/>
						) : (
							<>
								<TextField
									fullWidth
									id="adress"
									name="adress"
									color="secondary"
									value={values.adress}
									onChange={formik.handleChange}
									placeholder="Місто, вулиця, будинок, квартира"
									multiline={true}
								/>
								{touched.adress && errors.adress ? (
									<Error>{touched.adress && errors.adress}</Error>
								) : null}
							</>
						)}
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<div className="cart-products">
							<Typography
								className="cart-products--title"
								variant="h3"
								fontWeight="fontWeightBold"
								sx={{ fontSize: "18px" }}
							>
								Товари у кошику
							</Typography>
							<Box component="div" className="scroll">
								{itemsToRender}
							</Box>

							<OrderPrice total={isLoggedIn ? totalAuth : totalNotAuth} />
						</div>
						{!isLoggedIn && products.length !== 0 && (
							<Button type="submit" sx={submitBtn} color="primary">
								ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
							</Button>
						)}
						{isLoggedIn && authCart.length !== 0 && (
							<Button type="submit" sx={submitBtn} color="primary">
								ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
							</Button>
						)}
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default PlacingAnOrder;
