import React from "react";
import UseObjConstructorNotAuth from "./useObjConstructorNotAuth";

const UseSendOrderInfo = (
	values,
	initialValues,
	isLoggedIn,
	products,
	cartItems,
	shippingMethod,
	paymentMethod,
	total,
) => {
	const sendOrder = {};
	if (isLoggedIn) {
		sendOrder.customerId = initialValues._id;
		sendOrder.deliveryAddress = values.adress;
		sendOrder.shipping = shippingMethod;
		sendOrder.paymentInfo = paymentMethod;
		sendOrder.email = values.email;
		sendOrder.mobile = values.phoneNumber;
		sendOrder.letterSubject = "Thank you for order!";
		sendOrder.letterHtml = `<h1>Your order is placed.</h1>
			</br>
			<p>Сумма замовлення становить ${total} грн.</p>`;
	} else {
		sendOrder.products = UseObjConstructorNotAuth(products, cartItems);
		sendOrder.deliveryAddress = values.adress;
		sendOrder.shipping = shippingMethod;
		sendOrder.paymentInfo = paymentMethod;
		sendOrder.email = values.email;
		sendOrder.mobile = values.phoneNumber;
		sendOrder.letterSubject = "Thank you for order!";
		sendOrder.letterHtml = `<h1>Your order is placed.</h1>
			</br>
			<p>Сумма замовлення становить ${total} грн.</p>`;
	}
	return sendOrder;
};

export default UseSendOrderInfo;
