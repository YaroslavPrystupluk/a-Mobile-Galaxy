import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import "./cartItem.scss";
import Amount from "../Product/Amount";
import { deleteOneProduct, removeItemShoppingCart } from "../../store/reducers/cartSlice";
import { selectShoppingCart } from "../../store/selectors";

const CartItem = ({
	deleteProductById,
	imageUrls,
	itemNo,
	dbId,
	name,
	currentPrice,
	setTotalSum,
	quantity = "",
}) => {
	const dispatch = useDispatch();
	const shoppingCart = useSelector(selectShoppingCart);
	const isAuth = useSelector((state) => state.auth.isAuth);
	useEffect(() => {
		if (!dbId) return;
		const sum = shoppingCart[dbId] * currentPrice;
		setTotalSum((prev) => ({ ...prev, [dbId]: sum }));
	}, [shoppingCart, dbId]);
	return (
		<Box className="item">
			<Box className="itemBlock">
				{" "}
				{imageUrls && (
					<Link to={`/products/${itemNo}`}>
						<img src={imageUrls[0]} alt="product-item" className="item__image" />
					</Link>
				)}
				<h3 className="item__text">{name}</h3>
			</Box>

			<Box className="itemBlock itemBlock__description">
				<Amount
					amount={shoppingCart[dbId]}
					quantityAuth={quantity}
					setAmount={() => {}}
					itemNo={dbId}
				/>
				<p className="item__text">{currentPrice}</p>
				<p className="item__text">
					{/* eslint-disable-next-line no-unsafe-optional-chaining */}
					{!isAuth
						? Math.floor(currentPrice * shoppingCart[dbId] ?? 0)
						: Math.floor(currentPrice * quantity ?? 0)}
				</p>
				<button
					type="button"
					className="item__btn"
					onClick={() => {
						if (!isAuth) {
							deleteProductById(dbId);
							dispatch(removeItemShoppingCart(dbId));
						} else {
							dispatch(deleteOneProduct(dbId));
						}
					}}
				>
					<img
						src="https://res.cloudinary.com/dyvsyavmb/image/upload/v1676543739/images/llvbuvkf2jaupb5sfimm.svg"
						alt="arrow"
					/>
				</button>
			</Box>
		</Box>
	);
};
CartItem.propTypes = {
	itemNo: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	imageUrls: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	currentPrice: PropTypes.number.isRequired,
	setTotalSum: PropTypes.func.isRequired,
};
export default CartItem;
