import axios from "axios";
import { historyOrder } from "../historyOrdersSlice";

const initialState = {
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

describe("historyOrderSlice", () => {
	it("should historyOrder with resolved response", async () => {
		axios.get.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = historyOrder();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(historyOrder.pending().type);
		expect(end[0].type).toBe(historyOrder.fulfilled().type);
	});
});
