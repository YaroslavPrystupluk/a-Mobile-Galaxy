import axios from "axios";
import updateInfoReducer, { fetchUpdateCustomerInfo, removeMessage } from "../updateUserInfoSlice";

const mockCustomer = {
	name: "Yaroslav",
	lastName: "Prystupliuk",
	email: "tyucha9@gmail.com",
	tel: "+380961666416",
};

jest.mock("axios");

describe("updateUserInfoe", () => {
	it("should fetchUpdateCustomerInfo with resolved response", async () => {
		axios.put.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockCustomer),
		});

		const dispatch = jest.fn();

		const thunk = fetchUpdateCustomerInfo();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(fetchUpdateCustomerInfo.pending().type);
		expect(end[0].type).toBe(fetchUpdateCustomerInfo.fulfilled().type);
	});

	it("should updateUserInfoe 'removeMessage' action", () => {
		const initialState = { message: false };
		const action = { type: removeMessage.type, payload: false };
		const result = updateInfoReducer(initialState, action);

		expect(result.message).toEqual(false);
	});

	it("should fetch message with 'fetchSearchProducts.fulfilled' action", () => {
		const initialState = { message: false };
		const state = updateInfoReducer(initialState, fetchUpdateCustomerInfo.fulfilled(true));

		expect(state.message).toEqual(true);
	});
});
