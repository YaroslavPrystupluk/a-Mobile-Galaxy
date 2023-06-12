import axios from "axios";
import productsReducer, { fetchProducts, removeProduct, setParams } from "../productsSlice";
import { DOMAIN } from "../../../config/API";

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

jest.mock("axios");

describe("searchSlice", () => {
	it("should productsSlice with resolved response", async () => {
		axios.get.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});
		const dispatch = jest.fn();
		const thunk = fetchProducts();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(fetchProducts.pending().type);
		expect(end[0].type).toBe(fetchProducts.fulfilled().type);
	});

	it("should return default state when passed an empty actions", () => {
		const initialState = {
			data: [],
			params: "",
			dataQuantity: 0,
			loader: false,
		};
		const result = productsReducer(undefined, { type: "" });

		expect(result).toEqual(initialState);
	});

	it("should remove goods to products by id 'removeProduct' action", () => {
		const initialState = {
			data: [mockProduct],
			params: "",
			dataQuantity: 0,
			loader: false,
		};
		const action = { type: removeProduct.type, payload: mockProduct };
		const result = productsReducer(initialState, action);
		expect(result.data).toEqual([mockProduct]);
	});

	it("should remove item from products", () => {
		const initialState = {
			data: [mockProduct],
			params: "",
			dataQuantity: 0,
			loader: false,
		};
		const action = { type: removeProduct.type, payload: mockProduct };
		const expectedState = {
			data: [mockProduct],
			params: "",
			dataQuantity: 0,
			loader: false,
		};
		expect(productsReducer(initialState, action)).toEqual(expectedState);
	});

	it("returns the correct URL when filters are provided", async () => {
		const dispatch = jest.fn();
		const filters = "category=electronics";
		const expectedUrl = `${DOMAIN}/products/filter?${filters}`;
		const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue({ data: [mockProduct] });
		await fetchProducts(filters)(dispatch);
		expect(axiosGetSpy).toHaveBeenCalledWith(expectedUrl);
		axiosGetSpy.mockRestore();
	});

	it("should change status with 'fetchProducts.pending' action", () => {
		const initialState = {
			data: [],
			params: "",
			dataQuantity: 0,
			loader: false,
		};
		const state = productsReducer(initialState, fetchProducts.pending());

		expect(state.loader).toBe(true);
	});

	it("should fetch goods with 'fetchProducts.fulfilled' action", async () => {
		const dispatch = jest.fn();
		const initialState = {
			data: [],
			params: "",
			dataQuantity: 0,
			loader: false,
		};

		const productsQuantity = 0;
		const action = fetchProducts.fulfilled({ mockProduct, productsQuantity });
		await dispatch(action);

		const state = productsReducer(initialState, fetchProducts.fulfilled(mockProduct));

		expect(state.loader).toEqual(false);
		expect(state.data).toEqual(mockProduct);
		expect(state.dataQuantity).toEqual(productsQuantity);
		expect(state.loader).toBe(false);
	});

	it("should fetch goods with 'fetchProducts.rejected' action", () => {
		const initialState = {
			data: [],
			params: "",
			dataQuantity: 0,
			loader: false,
		};

		const action = {
			type: fetchProducts.rejected.type,
			payload: "Server Error !",
		};

		const state = productsReducer(initialState, action);

		expect(state.loader).toEqual(false);
		expect(state.data).toEqual([]);
		expect(state.Error).toEqual("Server Error !");
	});
});
