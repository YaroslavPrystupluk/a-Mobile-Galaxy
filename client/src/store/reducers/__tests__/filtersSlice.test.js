import axios from "axios";
import filtersReducer, {
	actionFetchFilters,
	actionFilters,
	actionLoad,
	clearFilters,
} from "../filtersSlice";
import { DOMAIN } from "../../../config/API";

const initialState = {
	arrFilters: [],
	load: false,
};

const mockProduct = [
	{
		name: "Apple iPhone 13 128gb",
		brand: "Apple",
		imageUrls: [
			"https://res.cloudinary.com/dsx708og4/image/upload/v1676278622/Lori_pro…",
			"https://res.cloudinary.com/dsx708og4/image/upload/v1676278622/Lori_pro…",
			"https://res.cloudinary.com/dsx708og4/image/upload/v1676278627/Lori_pro…",
			"https://res.cloudinary.com/dsx708og4/image/upload/v1676278632/Lori_pro…",
		],
		currentPrice: 56999,
		popular: false,
	},
];

jest.mock("axios");

describe("searchSlice", () => {
	it("should dispatch actionFilters with response data on successful request", async () => {
		const dispatch = jest.fn();

		const mockResponse = {
			data: {
				some: "data",
			},
		};
		axios.mockResolvedValueOnce(mockResponse);

		await actionFetchFilters(undefined, undefined, undefined)(dispatch);

		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith(`${DOMAIN}/filters/agregate`, { signal: undefined });
		expect(dispatch).toHaveBeenCalledTimes(3);
		expect(dispatch).toHaveBeenCalledWith(actionLoad(true));
		expect(dispatch).toHaveBeenCalledWith(actionFilters(mockResponse.data[0]));
		expect(dispatch).toHaveBeenCalledWith(actionLoad(false));
	});

	it("should not dispatch actionFilters on failed request", async () => {
		axios.mockRejectedValueOnce(new Error("Failed to fetch"));
		const dispatch = jest.fn();

		await actionFetchFilters(undefined, undefined, undefined)(dispatch);

		expect(axios).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledWith(actionLoad(true));
	});

	it("should return default state when passed an empty actions", () => {
		const result = filtersReducer(undefined, { type: "" });

		expect(result).toEqual(initialState);
	});

	it("should delete goods to filters 'actionFilters' action", () => {
		const action = { type: actionFilters.type, payload: mockProduct };
		const result = filtersReducer(initialState, action);

		expect(result.arrFilters).toEqual(mockProduct);
	});

	it("should delete goods to filter 'clearFilters' action", () => {
		const action = { type: clearFilters.type, payload: [] };
		const result = filtersReducer(initialState, action);

		expect(result.arrFilters).toEqual([]);
	});

	it("should delete goods to filters 'actionLoad' action", () => {
		const action = { type: actionLoad.type, payload: false };
		const result = filtersReducer(initialState, action);

		expect(result.load).toEqual(false);
	});
});
