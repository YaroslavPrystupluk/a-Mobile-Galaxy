import { useLocation } from "react-router-dom";

const useLocationParams = (additionalParams = {}) => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	if (Object.keys(additionalParams).length) {
		Object.keys(additionalParams).forEach((key) => {
			params.set(key, additionalParams[key]);
		});
	}
	return { params: params.toString() };
};

export default useLocationParams;
