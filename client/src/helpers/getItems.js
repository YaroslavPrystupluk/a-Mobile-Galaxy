import { getLocalItem } from "./getLocalItem";

export const getItems = (name, items) => {
	const parsed = JSON.parse(getLocalItem(name));
	if (!parsed) return [];
	return (
		items
			// eslint-disable-next-line consistent-return, array-callback-return
			.map((item) => {
				if (parsed.includes(item.itemNo)) return item;
			})
			.filter(Boolean)
	);
};
