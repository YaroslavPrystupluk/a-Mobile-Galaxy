import axios from "axios";
import searchReducer, {
	fetchSearchProducts,
	clearSearch,
	actionSetSearchProduct,
} from "../searchSlice";

const initialState = {
	matchedProductsQuantity: 0,
	searchProducts: [],
	loader: false,
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
	it("should fetchSearchProducts with resolved response", async () => {
		axios.post.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = fetchSearchProducts();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(fetchSearchProducts.pending().type);
		expect(end[0].type).toBe(fetchSearchProducts.fulfilled().type);
	});

	it("should delete goods to search 'clearSearch' action", () => {
		const action = { type: clearSearch.type, payload: [] };
		const result = searchReducer(initialState, action);

		expect(result.searchProducts).toEqual([]);
	});

	it("should add new goods to search 'actionSetSearchProduct' action", () => {
		const action = { type: actionSetSearchProduct.type, payload: mockProduct };
		const result = searchReducer(initialState, action);

		expect(result.searchProducts).toEqual([mockProduct]);
	});

	it("should change status with 'fetchSearchProducts.pending' action", () => {
		const state = searchReducer(initialState, fetchSearchProducts.pending());

		expect(state.loader).toBe(true);
	});

	it("updates matchedProductsQuantity correctly", () => {
		const action = {
			type: fetchSearchProducts.fulfilled,
			payload: { matchedProductsQuantity: 10 },
		};
		const newState = searchReducer(initialState, action);
		expect(newState.matchedProductsQuantity).toEqual(10);
	});

	it("updates searchProducts correctly", () => {
		const action = {
			type: fetchSearchProducts.fulfilled,
			payload: {
				matchedProducts: [
					{ id: 1, name: "Product 1" },
					{ id: 2, name: "Product 2" },
				],
			},
		};
		const newState = searchReducer(initialState, action);
		expect(newState.searchProducts).toEqual([
			{ id: 1, name: "Product 1" },
			{ id: 2, name: "Product 2" },
		]);
	});

	it("should fetch goods with 'fetchSearchProducts.rejected' action", () => {
		const action = {
			type: fetchSearchProducts.rejected.type,
			payload: "Server Error !",
		};

		const state = searchReducer(initialState, action);

		expect(state.loader).toEqual(false);
		expect(state.searchProducts).toEqual([]);
		expect(state.Error).toEqual("Server Error !");
	});
});
