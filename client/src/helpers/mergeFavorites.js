export const unionFavorite = (auFav, favor) => {
	const unionFav = auFav?.map((item) => item._id);
	unionFav.push(...favor);
	return {
		products: [...new Set([...unionFav])],
	};
};
