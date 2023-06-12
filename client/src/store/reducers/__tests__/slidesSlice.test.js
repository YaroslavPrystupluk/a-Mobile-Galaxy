import axios from "axios";
import slidesReducer, { fetchSlides } from "../slidesSlice";

const initialState = {
	slidesData: [],
	loader: true,
};

jest.mock("axios");

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

describe("fetchSlides", () => {
	it("shoud fetchSlides with resolved response", async () => {
		const data = { name: "Product A" };
		axios.get.mockResolvedValue({ data });
		const dispatch = jest.fn();
		const thunk = fetchSlides();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(fetchSlides.pending().type);
		expect(end[0].type).toBe(fetchSlides.fulfilled().type);
		expect(end[0].payload).toBe(data);
	});

	it("should handle error and reject with error message fetchSlides", async () => {
		const thunkAPI = {
			rejectWithValue: jest.fn(),
		};
		const error = new Error("fetch failed");
		axios.post.mockRejectedValueOnce(error);

		const dispatch = jest.fn();
		const thunk = fetchSlides();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(fetchSlides.pending().type);
		expect(end[0].type).toBe(fetchSlides.rejected().type);
		expect(end[0].meta.rejectedWithValue).toBe(false);
	});

	it("should change status with 'fetchSlides.pending' action", () => {
		const state = slidesReducer(initialState, fetchSlides.pending());

		expect(state.loader).toBe(true);
	});

	it("should fetch goods with 'fetchSlides.fulfilled' action", () => {
		const state = slidesReducer(initialState, fetchSlides.fulfilled(mockProduct));

		expect(state.loader).toEqual(false);
		expect(state.slidesData).toEqual(mockProduct);
	});
});
