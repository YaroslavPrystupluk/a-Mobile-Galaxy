import { getLocalItem } from "./getLocalItem";

export const getNumberOfItems = (name) => {
	const arrayLength = JSON.parse(getLocalItem(name));
	if (!arrayLength) {
		return 0;
	}
	return arrayLength.length;
};

export const counterCartSum = (products) => {
	// eslint-disable-next-line consistent-return,array-callback-return
	const mapped = products.map(({ currentPrice }) => currentPrice);
	const sum = mapped.reduce((partialSum, a) => partialSum + a, 0);
	return sum.toFixed(2);
};
