import axios from "axios";
import updatePasswordReducer, { fetchUpdatePassword, removeMessage } from "../changePasswordSlice";

const mockCustomer = {
	pass: "123456789",
};

jest.mock("axios");

describe("changePasswordSlice", () => {
	it("should fetchUpdatePassword with resolved response", async () => {
		axios.put.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockCustomer),
		});

		const dispatch = jest.fn();

		const thunk = fetchUpdatePassword();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toBe(fetchUpdatePassword.pending().type);
		expect(end[0].type).toBe(fetchUpdatePassword.fulfilled().type);
	});

	it("should updateUserInfoe 'removeMessage' action", () => {
		const initialState = { message: false };
		const action = { type: removeMessage.type, payload: false };
		const result = updatePasswordReducer(initialState, action);

		expect(result.message).toEqual(false);
	});

	it("should fetch message with 'fetchSearchProducts.fulfilled' action", () => {
		const initialState = { message: false };
		const state = updatePasswordReducer(initialState, fetchUpdatePassword.fulfilled(true));

		expect(state.message).toEqual(true);
	});
});
