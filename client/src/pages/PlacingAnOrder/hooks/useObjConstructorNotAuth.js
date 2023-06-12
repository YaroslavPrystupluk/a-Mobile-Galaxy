import React from "react";

const UseObjConstructorNotAuth = (products, cartItems) =>
	products.map((obj) => {
		const result = {};
		result._id = obj._id;
		result.product = obj;
		result.cartQuantity = cartItems[obj._id];
		return result;
	});
export default UseObjConstructorNotAuth;
