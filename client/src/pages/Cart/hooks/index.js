const useItemsToRender = (items, setter) => {
	const params = new URLSearchParams();
	if (typeof items === "object") params.set("_id", Object.keys(items).join(","));
	if (Array.isArray(items)) params.set("_id", items.join(","));
	if (params.toString() === "_id=") setter([]);
	return params.toString();
};

export default useItemsToRender;
