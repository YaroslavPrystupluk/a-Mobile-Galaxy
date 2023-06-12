import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Button } from "@mui/material";
import CartItem from "../../components/CartItem/CartItem";
import NoItemsFoundMessage from "../ProductsCatalogue/component/NoItemsFoundMessage";
import { fetchProducts } from "../../store/reducers/productsSlice";
// eslint-disable-next-line import/named
import { getCartAuth, setTotalCartSum, getTotatlAuthCartSum } from "../../store/reducers/cartSlice";
import Spinner from "../../components/Spinner";
import "./cart.scss";
import useItemsToRender from "./hooks";
import CategoryTitle from "../../components/CategoryTitle";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const cartItems = useSelector((state) => state.cart.shoppingCart);
	const [totalSum, setTotalSum] = useState({});
	const isAuth = useSelector((state) => state.auth.isAuth);
	const authCart = useSelector((state) => state.cart.shoppingCartAuth);
	const productsLoading = useSelector((state) => state.products.loader);
	const { loading } = useSelector((state) => state.cart.meta);
	const deleteProductById = (id) => {
		setProducts((prev) => prev.filter((el) => el._id !== id));
	};
	useEffect(() => {
		if (!isAuth) return;
		dispatch(getCartAuth());
	}, [isAuth]);
	useEffect(() => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const params = useItemsToRender(cartItems, setProducts);
		if (params === "_id=") return;
		dispatch(fetchProducts(params)).then((res) => {
			setProducts(res.payload.products);
			// setRender(true);
		});
	}, []);
	useEffect(() => {
		if (!products.length) {
			setTotalSum({});
			return;
		}
		const totalSumCart = products.reduce((acc, { currentPrice, _id }) => {
			acc[_id] = currentPrice * cartItems[_id];
			return acc;
		}, {});
		setTotalSum(() => totalSumCart);
	}, [products]);
	const itemsToRender = isAuth
		? authCart?.map((item) => {
				return (
					<CartItem
						dbId={item.product._id}
						key={item.product.itemNo}
						itemNo={item.product.itemNo}
						imageUrls={item.product.imageUrls}
						name={item.product.name}
						currentPrice={item.product.currentPrice}
						quantity={item.cartQuantity}
						setTotalSum={setTotalSum}
						deleteProductById={deleteProductById}
					/>
				);
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  })
		: products?.map(({ _id: id, imageUrls, name, itemNo, currentPrice }) => {
				return (
					<CartItem
						dbId={id}
						key={itemNo}
						itemNo={itemNo}
						imageUrls={imageUrls}
						name={name}
						currentPrice={currentPrice}
						setTotalSum={setTotalSum}
						deleteProductById={deleteProductById}
					/>
				);
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  });
	const countOverallPrice = (itemsSum) => {
		const cartItemIds = Object.keys(cartItems);
		const total = cartItemIds.reduce((acc, id) => acc + (itemsSum[id] || 0), 0);
		dispatch(setTotalCartSum(total));
		return total ?? 0;
	};

	const countTotalPriceAuth = () => {
		const total = authCart.reduce((acc, item) => {
			const quantity = item.cartQuantity;
			const prodPrice = item.product.currentPrice;
			const itemTotal = quantity * prodPrice;
			return acc + itemTotal ?? 0;
		}, 0);
		dispatch(getTotatlAuthCartSum(total));
		return total;
	};
	if (isAuth && loading) return <Spinner />;
	if (!isAuth && productsLoading) return <Spinner />;
	return (
		<Container>
			<div className="cart__wrapper">
				<CategoryTitle text="Кошик" />
				{!products.length && !authCart.length && <NoItemsFoundMessage />}
				{!productsLoading && (
					<Box className="cart">
						<div className="cart__items">{itemsToRender}</div>
						<Box className="cart__info">
							<Box className="cart__description">
								<h4 className="cart__description-order">Ваше замовлення</h4>
								<span className="cart__description-total">
									Загальна сума: {!isAuth ? countOverallPrice(totalSum) : countTotalPriceAuth()}
								</span>
							</Box>

							<Box className="cart__controllers">
								<Button
									color="secondary"
									variant="outlined"
									className="btn"
									onClick={(e) => {
										e.preventDefault();
										navigate("/products");
									}}
								>
									Продовжити покупки
								</Button>
								{isAuth && authCart.length !== 0 && (
									<Button
										color="secondary"
										variant="contained"
										onClick={(e) => {
											e.preventDefault();
											dispatch(setTotalCartSum(countTotalPriceAuth()));
											navigate("/orders");
											window.scroll(0, 0);
										}}
										className="btn"
									>
										Оформити замовлення
									</Button>
								)}
								{!isAuth && products.length !== 0 && (
									<Button
										color="secondary"
										variant="contained"
										onClick={(e) => {
											e.preventDefault();
											dispatch(setTotalCartSum(countOverallPrice(totalSum)));
											navigate("/orders");
										}}
										className="btn"
									>
										Оформити замовлення
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				)}
			</div>
		</Container>
	);
};

export default Cart;
