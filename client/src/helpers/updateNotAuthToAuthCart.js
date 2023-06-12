export const updateNotAuthToAuthCart = (localCart, authCart) => {
	const transformedCartAuth = authCart.map(({ cartQuantity, product }) => ({
		product: product._id,
		cartQuantity,
	}));
	const transformedCartLocal = Object.entries(localCart).map(([productId, cartQuantity]) => ({
		product: productId,
		cartQuantity,
	}));
	const mergedCart = [...transformedCartAuth, ...transformedCartLocal];
	const updatedCart = mergedCart.reduce((acc, { product, cartQuantity }) => {
		const existingProduct = acc.find((p) => p.product === product);
		if (existingProduct) {
			existingProduct.cartQuantity += cartQuantity;
		} else {
			acc.push({ product, cartQuantity });
		}
		return acc;
	}, []);
	return { products: updatedCart };
};
