import axios from "axios";
import ordersReducer, { createOrder, setOrderData } from "../ordersSlice";
import { DOMAIN } from "../../../config/API";

const initialState = {
	orderData: "",
	orderProducts: [],
	orderNo: 0,
	meta: { loading: false, loaded: true, error: null, dataSent: false, order: false },
};

jest.mock("axios");

describe("createOrder", () => {
	it("should create order and delete cart with auth", async () => {
		const dispatch = jest.fn();
		const getState = jest.fn(() => ({ auth: { isAuth: true } }));
		const user = { name: "John Doe" };
		const response = { data: { order: { orderNo: "12345" } } };

		axios.post.mockResolvedValueOnce(response);

		await createOrder(user)(dispatch, getState, undefined);

		expect(axios.post).toHaveBeenCalledWith(`${DOMAIN}/orders`, user);
		expect(dispatch).toHaveBeenCalledTimes(4);
	});

	it("should create order and clear cart without auth", async () => {
		const dispatch = jest.fn();
		const getState = jest.fn(() => ({ auth: { isAuth: false } }));
		const user = { name: "John Doe" };
		const response = { data: { order: { orderNo: "12345" } } };

		axios.post.mockResolvedValueOnce(response);

		await createOrder(user)(dispatch, getState, undefined);

		expect(axios.post).toHaveBeenCalledWith(`${DOMAIN}/orders`, user);
		expect(dispatch).toHaveBeenCalledTimes(4);
	});

	it("should handle error and return rejectWithValue", async () => {
		const dispatch = jest.fn();
		const getState = jest.fn(() => ({ auth: { isAuth: false } }));
		const user = { name: "John Doe" };
		const response = { data: { error: "Network error" } };

		axios.post.mockResolvedValueOnce(response);

		await createOrder(user)(dispatch, getState, undefined);

		expect(axios.post).toHaveBeenCalledWith(`${DOMAIN}/orders`, user);
		expect(dispatch).toHaveBeenCalledTimes(2);
	});

	it("should add new goods to order 'setOrderData' action", () => {
		const response = { data: { order: { orderNo: "12345" } } };
		const action = { type: setOrderData.type, payload: response };
		const result = ordersReducer(initialState, action);

		expect(result.orderData).toEqual(response);
	});

	it("should change status with 'createOrder.pending' action", () => {
		const state = ordersReducer(initialState, createOrder.pending());

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(true);
		expect(state.meta.error).toBe(null);
		expect(state.meta.dataSent).toBe(false);
		expect(state.meta.order).toBe(false);
	});

	it("should change status with 'createOrder.fulfilled' action", () => {
		const response = { data: { order: { orderNo: "12345" } } };
		const state = ordersReducer(initialState, createOrder.fulfilled(response));

		expect(state.orderProducts).toBe(response);
		expect(state.meta.loaded).toBe(true);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.error).toBe(null);
		expect(state.meta.dataSent).toBe(true);
		expect(state.meta.order).toBe(false);
	});

	it("should change status with 'createOrder.rejected' action", () => {
		const response = { data: { error: "Network error" } };
		const action = {
			type: createOrder.rejected.type,
			payload: "Server Error !",
		};
		const state = ordersReducer(initialState, action);

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.error).toBe("Server Error !");
		expect(state.meta.dataSent).toBe(false);
		expect(state.meta.order).toBe(false);
	});
});
