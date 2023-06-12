import modalReducer, { setModal, setOrderNo } from "../modalSlice";

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

const mockOrderNo = 5;

const initialState = {
	value: [],
	orderNo: null,
};

describe("oneProductSlice", () => {
	it("shoud setModal with resolved response", async () => {
		const action = { type: setModal.type, payload: mockProduct };
		const result = modalReducer(initialState, action);

		expect(result.value).toEqual(mockProduct);
	});

	it("shoud setOrderNo with resolved response", async () => {
		const action = { type: setOrderNo.type, payload: mockOrderNo };
		const result = modalReducer(initialState, action);

		expect(result.orderNo).toEqual(mockOrderNo);
	});
});
