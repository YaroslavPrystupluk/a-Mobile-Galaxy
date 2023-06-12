import axios from "axios";
import oneProductsReducer, {
	actionFetchProduct,
	actionPage,
	actionLoading,
} from "../oneProductSlice";
import { DOMAIN } from "../../../config/API";

const initialState = {
	pageObj: {},
	loading: false,
};
const mockProduct = {
	id: "22222",
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
};
const id = "123";

jest.mock("axios");

describe("oneProductSlice", () => {
	it("shoud actionFetchProduct with resolved response", async () => {
		const data = { name: "Product A" };
		axios.get.mockResolvedValue({ data });

		const dispatch = jest.fn();
		await actionFetchProduct(id)(dispatch);

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(3);

		expect(dispatch).toHaveBeenCalledWith(actionLoading(true));
		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/products/${id}`);
		expect(dispatch).toHaveBeenCalledWith(actionPage(data));
		expect(dispatch).toHaveBeenCalledWith(actionLoading(false));
	});

	it("should return default state when passed an empty actions", () => {
		const result = oneProductsReducer(undefined, { type: "" });

		expect(result).toEqual(initialState);
	});

	it("should add new goods 'actionPage' action", () => {
		const action = { type: actionPage.type, payload: mockProduct };
		const result = oneProductsReducer(initialState, action);

		expect(result.pageObj).toEqual(mockProduct);
	});

	it("should add new goods 'actionLoading' action", () => {
		const action = { type: actionLoading.type, payload: false };
		const result = oneProductsReducer(initialState, action);

		expect(result.loading).toEqual(false);
	});
});
