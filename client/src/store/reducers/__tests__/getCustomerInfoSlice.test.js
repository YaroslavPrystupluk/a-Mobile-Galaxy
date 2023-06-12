import axios from "axios";
import customerReducer, { fetchCustomer } from "../getCustomerInfoSlice";
import { DOMAIN } from "../../../config/API";

const initialState = { customer: {}, meta: { loading: false, loaded: true } };

const response = { name: "John", email: "john@example.com" };

jest.mock("axios");

describe("fetchCustomer", () => {
	it("fetches customer data from API when token is provided", async () => {
		axios.get.mockResolvedValue({ response });
		global.localStorage.getItem = jest.fn().mockReturnValue("token");
		global.setAuthToken = jest.fn();
		const token = "token";
		localStorage.setItem("token", token);

		const dispatch = jest.fn();
		await fetchCustomer()(dispatch);

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/customers/customer`, {
			headers: {
				Authorization: token,
			},
		});
	});

	it("returns undefined when token is not provided", async () => {
		localStorage.removeItem("token");
		const dispatch = jest.fn();
		await fetchCustomer()(dispatch);
		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/customers/customer`, {
			headers: {
				Authorization: null,
			},
		});
	});

	it("should change status with 'fetchCustomer.pending' action", () => {
		const state = customerReducer(initialState, fetchCustomer.pending());

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(true);
	});

	it("should fetch goods with 'fetchCustomer.fulfilled' action", () => {
		const state = customerReducer(initialState, fetchCustomer.fulfilled(response));

		expect(state.meta.loaded).toBe(true);
		expect(state.meta.loading).toBe(false);
		expect(state.customer).toEqual(response);
	});
});
