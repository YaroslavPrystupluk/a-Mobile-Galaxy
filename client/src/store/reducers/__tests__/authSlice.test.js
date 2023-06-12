import axios from "axios";
import authReducer, { fetchAuth, fetchRegister, setIsAuth } from "../authSlice";
import { DOMAIN } from "../../../config/API";

jest.mock("axios");

describe("fetchAuth", () => {
	it("should return user data when login succeeds", async () => {
		const mockData = { email: "example@example.com", password: "password" };
		const mockThunkAPI = {
			dispatch: jest.fn(),
			getState: () => ({ cart: { shoppingCart: [] } }),
		};
		const mockResponse = { data: { token: "example_token" } };

		axios.post.mockResolvedValue(mockResponse);
		const dispatch = jest.fn();

		await fetchAuth(mockData, mockThunkAPI)(dispatch);

		expect(axios.post).toHaveBeenCalledWith(`${DOMAIN}/customers/login`, {
			email: "example@example.com",
			password: "password",
		});
	});

	it("should call axios.post for fetchRegister and return response data", async () => {
		const postCart = { cartId: "123", userId: "456" };
		const response = { data: { message: "Cart updated successfully" } };
		axios.post.mockResolvedValueOnce(response);
		const dispatch = jest.fn();

		const resultAction = await fetchRegister(postCart)(dispatch);

		expect(axios.post).toHaveBeenCalledWith(`${DOMAIN}/customers`, postCart);
		expect(resultAction.type).toEqual("user/register/fulfilled");
	});

	it("should call thunkAPI.rejectWithValue if axios.put for updateCartFromNotAuthToAuth throws an error", async () => {
		const postCart = { cartId: "123", userId: "456" };
		const error = { message: "Cart update failed" };
		const dispatch = jest.fn();
		axios.put.mockRejectedValueOnce(error);

		const resultAction = await fetchRegister(postCart)(dispatch);

		expect(axios.post).toHaveBeenCalledWith(`${DOMAIN}/customers`, postCart);
		expect(resultAction.type).toEqual("user/register/rejected");
	});

	it("should set the isAuth value to true", () => {
		const initialState = { isAuth: false };
		const action = { type: setIsAuth, payload: true };
		const expectedState = { isAuth: true, tokenUser: "example_token" };

		const actualState = authReducer(initialState, action);

		expect(actualState).toEqual(expectedState);
	});

	it("should set the isAuth value to false", () => {
		const initialState = { isAuth: true };
		const action = { type: setIsAuth, payload: false };
		const expectedState = { isAuth: false, tokenUser: "" };

		const actualState = authReducer(initialState, action);

		expect(actualState).toEqual(expectedState);
	});

	it("should change status with 'fetchAuth.pending' action", () => {
		const initialState = {
			user: {},
			isAuth: false,
			tokenUser: "",
			meta: { loading: false, loaded: true, error: null },
		};

		const state = authReducer(initialState, fetchAuth.pending());

		expect(state.user).toEqual({});
		expect(state.isAuth).toBe(false);
		expect(state.tokenUser).toBe("");
		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(true);
		expect(state.meta.error).toBe(null);
	});

	it("should fetch goods with 'fetchAuth.fulfilled' action", () => {
		const response = { data: { message: "Cart updated successfully" } };
		const initialState = {
			user: {},
			isAuth: false,
			tokenUser: "",
			meta: { loading: false, loaded: true, error: null },
		};
		const state = authReducer(initialState, fetchAuth.fulfilled(response));

		expect(state.user).toEqual(response);
		expect(state.isAuth).toBe(true);
		expect(state.tokenUser).toBe("");
		expect(state.meta.loaded).toBe(true);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.error).toBe(null);
	});

	it("should fetch goods with 'fetchAuth.rejected' action", () => {
		const error = { data: { message: "Cart error successfully" } };
		const initialState = {
			user: {},
			isAuth: false,
			tokenUser: "",
			meta: { loading: false, loaded: true, error },
		};
		const state = authReducer(initialState, fetchAuth.fulfilled(error));

		expect(state.meta.loaded).toBe(true);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.error).toBe(error);
	});
});
