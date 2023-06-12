const makeConfigFromUrl = (search) => {
	const refSearch = {};
	const params = search?.split("?").splice(1)[0].split("&");
	params?.forEach((param) => {
		const [key, value] = param.split("=");
		if (key === "brand" || key === "categories") {
			refSearch[key] = value.split(",");
		} else refSearch[key] = value;
	});
	return refSearch;
};

export default makeConfigFromUrl;
