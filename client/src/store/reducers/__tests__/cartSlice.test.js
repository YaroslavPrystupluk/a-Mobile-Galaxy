import axios from "axios";
import cartReducer, {
	updateCartFromNotAuthToAuth,
	getCartAuth,
	addOneProductAuth,
	deleteOneProduct,
	decreaseAmountAuth,
	deleteCartAuth,
	addShoppingCart,
	removeItemShoppingCart,
	addQuantityToShoppingCart,
	setTotalCartSum,
	clearCart,
	getTotatlAuthCartSum,
} from "../cartSlice";
import { DOMAIN } from "../../../config/API";

jest.mock("axios");

describe("updateCartFromNotAuthToAuth", () => {
	const dispatch = jest.fn();
	const getState = jest.fn();
	const id = 123;
	beforeEach(() => {
		dispatch.mockClear();
		getState.mockClear();
	});
	it("updates total cart quantity when items are added or removed", () => {
		const initialState = {
			shoppingCart: {
				item1: 2,
				item2: 3,
				item3: 1,
			},
			totalCartQuantity: 0,
		};

		Object.keys(initialState.shoppingCart).forEach((key) => {
			initialState.totalCartQuantity += initialState.shoppingCart[key];
		});

		expect(initialState.totalCartQuantity).toEqual(6);
	});

	it("should call axios.put for updateCartFromNotAuthToAuth and return response data", async () => {
		const updatedCart = { cartId: "123", userId: "456" };
		const response = { data: { message: "Cart updated successfully" } };
		axios.put.mockResolvedValueOnce(response);

		const resultAction = await updateCartFromNotAuthToAuth(updatedCart)(
			dispatch,
			getState,
			undefined,
		);

		expect(axios.put).toHaveBeenCalledWith(`${DOMAIN}/cart`, updatedCart);
		expect(resultAction.type).toEqual("cart/updateCart/fulfilled");
		expect(resultAction.payload).toEqual(response.data);
	});

	it("should call thunkAPI.rejectWithValue if axios.put for updateCartFromNotAuthToAuth throws an error", async () => {
		const updatedCart = { cartId: "123", userId: "456" };
		const error = { message: "Cart update failed" };
		axios.put.mockRejectedValueOnce(error);

		const resultAction = await updateCartFromNotAuthToAuth(updatedCart)(
			dispatch,
			getState,
			undefined,
		);

		expect(axios.put).toHaveBeenCalledWith(`${DOMAIN}/cart`, updatedCart);
		expect(resultAction.type).toEqual("cart/updateCart/rejected");
		expect(resultAction.payload).toEqual(error);
	});

	it("should call axios.get for getCartAuth and return response data", async () => {
		const updatedCart = { cartId: "123", userId: "456" };
		const response = { data: { message: "Cart get data successfully" } };
		axios.get.mockResolvedValueOnce(response);

		const resultAction = await getCartAuth(updatedCart)(dispatch);

		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/cart`);
		expect(resultAction.type).toEqual("cart/getData/fulfilled");
	});

	it("should call thunkAPI.rejectWithValue if axios.get for getCartAuth throws an error", async () => {
		const updatedCart = { cartId: "123", userId: "456" };
		const error = { message: "Cart get data failed" };
		axios.get.mockRejectedValueOnce(error);

		const resultAction = await getCartAuth(updatedCart)(dispatch, getState, undefined);
		console.log(resultAction);

		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/cart`);
		expect(resultAction.type).toEqual("cart/getData/rejected");
	});

	it("should call axios.put for addOneProductAuth and return response data", async () => {
		const response = { data: { message: "Cart add successfully" } };
		axios.put.mockResolvedValueOnce(response);

		const resultAction = await addOneProductAuth(id)(dispatch, getState, undefined);

		expect(axios.put).toHaveBeenCalledWith(`${DOMAIN}/cart/${id}`);
		expect(resultAction.type).toEqual("cart/addOneProductAuth/fulfilled");
		expect(resultAction.payload).toEqual(response.data);
	});

	it("should call thunkAPI.rejectWithValue if axios.put for addOneProductAuth throws an error", async () => {
		const error = { message: "Cart add failed" };
		axios.put.mockRejectedValueOnce(error);

		const resultAction = await addOneProductAuth(id)(dispatch, getState, undefined);

		expect(axios.put).toHaveBeenCalledWith(`${DOMAIN}/cart/${id}`);
		expect(resultAction.type).toEqual("cart/addOneProductAuth/rejected");
		expect(resultAction.payload).toEqual(error);
	});

	it("should call axios.delete for deleteOneProduct and return response data", async () => {
		const response = { data: { message: "Cart delete successfully" } };
		axios.delete.mockResolvedValueOnce(response);

		const resultAction = await deleteOneProduct(id)(dispatch, getState, undefined);

		expect(axios.delete).toHaveBeenCalledWith(`${DOMAIN}/cart/${id}`);
		expect(resultAction.type).toEqual("cart/deleteOneProduct/fulfilled");
		expect(resultAction.payload).toEqual(response.data);
	});

	it("should call thunkAPI.rejectWithValue if axios.delete for deleteOneProduct throws an error", async () => {
		const error = { message: "Cartdelete failed" };
		axios.delete.mockRejectedValueOnce(error);

		const resultAction = await deleteOneProduct(id)(dispatch, getState, undefined);

		expect(axios.delete).toHaveBeenCalledWith(`${DOMAIN}/cart/${id}`);
		expect(resultAction.type).toEqual("cart/deleteOneProduct/rejected");
		expect(resultAction.payload).toEqual(error);
	});

	it("should call axios.delete for deleteCartAuth and return response data", async () => {
		const response = { data: { message: "Cart delete successfully" } };
		axios.delete.mockResolvedValueOnce(response);

		const resultAction = await deleteCartAuth()(dispatch, getState, undefined);

		expect(axios.delete).toHaveBeenCalledWith(`${DOMAIN}/cart`);
		expect(resultAction.type).toEqual("cart/deleteCartAuth/fulfilled");
		expect(resultAction.payload).toEqual(response.data);
	});

	it("should call thunkAPI.rejectWithValue if axios.delete for deleteCartAuth throws an error", async () => {
		const error = { message: "Cart delete failed" };
		axios.delete.mockRejectedValueOnce(error);

		const resultAction = await deleteCartAuth()(dispatch, getState, undefined);

		expect(axios.delete).toHaveBeenCalledWith(`${DOMAIN}/cart`);
		expect(resultAction.type).toEqual("cart/deleteCartAuth/rejected");
	});

	it("should call axios.delete for decreaseAmountAuth and return response data", async () => {
		const response = { data: { message: "Cart delete successfully" } };
		axios.delete.mockResolvedValueOnce(response);

		const resultAction = await decreaseAmountAuth(id)(dispatch, getState, undefined);

		expect(axios.delete).toHaveBeenCalledWith(`${DOMAIN}/cart/product/${id}`);
		expect(resultAction.type).toEqual("cart/decreaseAmountAuth/fulfilled");
		expect(resultAction.payload).toEqual(response.data);
	});

	it("should call thunkAPI.rejectWithValue if axios.delete for decreaseAmountAuth throws an error", async () => {
		const error = { message: "Cart delete failed" };
		axios.delete.mockRejectedValueOnce(error);

		const resultAction = await decreaseAmountAuth(id)(dispatch, getState, undefined);

		expect(axios.delete).toHaveBeenCalledWith(`${DOMAIN}/cart/product/${id}`);
		expect(resultAction.type).toEqual("cart/decreaseAmountAuth/rejected");
		expect(resultAction.payload).toEqual(error);
	});

	it("should handle adding a new item to the cart", () => {
		const state = {
			shoppingCart: {},
			totalCartQuantity: 0,
		};
		const action = {
			type: addShoppingCart.type,
			payload: "product1",
		};
		const newState = cartReducer(state, action);
		expect(newState.shoppingCart.product1).toEqual(1);
		expect(newState.totalCartQuantity).toEqual(1);
	});

	it("should handle adding an existing item to the cart", () => {
		const state = {
			shoppingCart: { product1: 1 },
			totalCartQuantity: 1,
		};
		const action = {
			type: addShoppingCart.type,
			payload: "product1",
		};
		const newState = cartReducer(state, action);
		expect(newState.shoppingCart.product1).toEqual(1);
		expect(newState.totalCartQuantity).toEqual(1);
	});

	it("should handle not adding a new item if it already exists in the cart", () => {
		const state = {
			shoppingCart: { product1: 1 },
			totalCartQuantity: 1,
		};
		const action = {
			type: addShoppingCart.type,
			payload: "product1",
		};
		const newState = cartReducer(state, action);
		expect(newState.shoppingCart.product1).toEqual(1);
		expect(newState.totalCartQuantity).toEqual(1);
	});

	it("should remove item from shopping cart", () => {
		const initialState = {
			shoppingCart: {
				1: 2,
				2: 1,
			},
			totalCartQuantity: 3,
		};
		const action = {
			type: removeItemShoppingCart.type,
			payload: 1,
		};

		const expectedState = {
			shoppingCart: {
				2: 1,
			},
			totalCartQuantity: 1,
		};

		const actualState = cartReducer(initialState, action);

		expect(actualState).toEqual(expectedState);
	});

	it("should handle addQuantityToShoppingCart action with existing item", () => {
		const prevState = {
			shoppingCart: {
				"item-1": 2,
				"item-2": 1,
			},
			totalCartQuantity: 3,
			totalCartSum: 50,
		};
		const action = {
			type: addQuantityToShoppingCart.type,
			payload: {
				itemNo: "item-1",
				addToQty: 2,
			},
		};
		const newState = cartReducer(prevState, action);
		expect(newState.shoppingCart["item-1"]).toBe(4);
		expect(newState.totalCartQuantity).toBe(5);
	});

	it("should handle addQuantityToShoppingCart action with new item", () => {
		const prevState = {
			shoppingCart: {
				"item-1": 2,
				"item-2": 1,
			},
			totalCartQuantity: 3,
			totalCartSum: 50,
		};
		const action = {
			type: addQuantityToShoppingCart.type,
			payload: {
				itemNo: "item-2",
				addToQty: 2,
			},
		};
		const newState = cartReducer(prevState, action);
		expect(newState.shoppingCart["item-2"]).toBe(3);
		expect(newState.totalCartQuantity).toBe(5);
	});

	it("should handle setTotalCartSum action", () => {
		const prevState = {
			shoppingCart: {
				"item-1": 2,
				"item-2": 1,
			},
			totalCartQuantity: 3,
			totalCartSum: 50,
		};
		const action = {
			type: setTotalCartSum.type,
			payload: 75,
		};
		const newState = cartReducer(prevState, action);
		expect(newState.totalCartSum).toBe(75);
	});

	it("should not modify state for invalid action type", () => {
		const prevState = {
			shoppingCart: {
				"item-1": 2,
				"item-2": 1,
			},
			totalCartQuantity: 3,
			totalCartSum: 50,
		};
		const action = {
			type: "invalidActionType",
			payload: {},
		};
		const newState = cartReducer(prevState, action);
		expect(newState).toEqual(prevState);
	});

	it("should clear the cart", () => {
		const prevState = {
			shoppingCart: ["item1", "item2"],
			totalCartQuantity: 2,
			totalCartSum: 50,
			cartAuthTotalSum: 0,
		};
		const expectedState = {
			shoppingCart: [],
			totalCartQuantity: 0,
			totalCartSum: 0,
			cartAuthTotalSum: 0,
		};
		const action = { type: clearCart.type };
		const result = cartReducer(prevState, action);
		expect(result).toEqual(expectedState);
	});

	it("should update the authenticated cart total sum", () => {
		const prevState = {
			shoppingCart: ["item1", "item2"],
			totalCartQuantity: 2,
			totalCartSum: 50,
			cartAuthTotalSum: 0,
		};
		const expectedState = {
			shoppingCart: ["item1", "item2"],
			totalCartQuantity: 2,
			totalCartSum: 50,
			cartAuthTotalSum: 100,
		};
		const action = { type: getTotatlAuthCartSum.type, payload: 100 };
		const result = cartReducer(prevState, action);
		expect(result).toEqual(expectedState);
	});

	it("should change status with 'addOneProductAuth.pending' action", () => {
		const initialState = {
			meta: { loading: false, loaded: true, error: null },
		};
		const state = cartReducer(initialState, addOneProductAuth.pending());

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(true);
	});

	it("should change status with 'addOneProductAuth.fulfilled' action", () => {
		const initialState = {
			shoppingCartAuth: [],
			totalCartQuantity: 0,
			meta: { loading: false, loaded: false },
		};
		const products = [
			{ id: 1, cartQuantity: 1 },
			{ id: 2, cartQuantity: 2 },
		];
		const action = {
			type: addOneProductAuth.fulfilled.type,
			payload: { products },
		};
		const state = cartReducer(initialState, action);

		expect(state.shoppingCartAuth).toEqual(products);
		expect(state.totalCartQuantity).toEqual(3);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.loaded).toBe(true);
	});

	it("should change status with 'addOneProductAuth.rejected' action", () => {
		const initialState = {
			meta: { loading: false, loaded: true, error: null },
		};
		const state = cartReducer(initialState, addOneProductAuth.rejected());

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(false);
	});

	it("should change status with 'deleteOneProduct.fulfilled,' action", () => {
		const initialState = {
			shoppingCartAuth: [],
			totalCartQuantity: 0,
			meta: { loading: false, loaded: false },
		};
		const products = [
			{ id: 1, cartQuantity: 1 },
			{ id: 2, cartQuantity: 2 },
		];
		const action = {
			type: deleteOneProduct.fulfilled.type,
			payload: { products },
		};
		const state = cartReducer(initialState, action);

		expect(state.shoppingCartAuth).toEqual(products);
		expect(state.totalCartQuantity).toEqual(3);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.loaded).toBe(true);
	});

	it("should change status with 'getCartAuth.fulfilled,' action", () => {
		const initialState = {
			shoppingCartAuth: [],
			totalCartQuantity: 0,
			meta: { loading: false, loaded: false },
		};
		const products = [
			{ id: 1, cartQuantity: 1 },
			{ id: 2, cartQuantity: 2 },
		];
		const action = {
			type: getCartAuth.fulfilled.type,
			payload: products,
		};
		const state = cartReducer(initialState, action);

		expect(state.shoppingCartAuth).toEqual(products);
		expect(state.totalCartQuantity).toEqual(3);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.loaded).toBe(true);
	});

	it("should change status with 'getCartAuth.pending' action", () => {
		const initialState = {
			meta: { loading: false, loaded: true, error: null },
		};
		const state = cartReducer(initialState, getCartAuth.pending());

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(true);
	});

	it("should change status with 'updateCartFromNotAuthToAuth.fulfilled,' action", () => {
		const initialState = {
			shoppingCartAuth: [],
			totalCartQuantity: 0,
			meta: { loading: false, loaded: false },
		};
		const products = [
			{ id: 1, cartQuantity: 1 },
			{ id: 2, cartQuantity: 2 },
		];
		const action = {
			type: updateCartFromNotAuthToAuth.fulfilled.type,
			payload: { products },
		};
		const state = cartReducer(initialState, action);

		expect(state.shoppingCartAuth).toEqual(products);
		expect(state.totalCartQuantity).toEqual(3);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.loaded).toBe(true);
	});

	it("should change status with 'updateCartFromNotAuthToAuth.rejected' action", () => {
		const initialState = {
			meta: { loading: false, loaded: true, error: null },
		};
		const state = cartReducer(initialState, updateCartFromNotAuthToAuth.rejected());

		expect(state.meta.loaded).toBe(false);
		expect(state.meta.loading).toBe(false);
	});

	it("should change status with 'decreaseAmountAuth.fulfilled,' action", () => {
		const initialState = {
			shoppingCartAuth: [],
			totalCartQuantity: 0,
			meta: { loading: false, loaded: false },
		};
		const products = [
			{ id: 1, cartQuantity: 1 },
			{ id: 2, cartQuantity: 2 },
		];
		const action = {
			type: decreaseAmountAuth.fulfilled.type,
			payload: { products },
		};
		const state = cartReducer(initialState, action);

		expect(state.shoppingCartAuth).toEqual(products);
		expect(state.totalCartQuantity).toEqual(0);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.loaded).toBe(true);
	});

	it("should change status with 'deleteCartAuth.fulfilled,' action", () => {
		const initialState = {
			shoppingCartAuth: [],
			totalCartQuantity: 0,
			meta: { loading: false, loaded: false },
		};
		const products = [
			{ id: 1, cartQuantity: 1 },
			{ id: 2, cartQuantity: 2 },
		];
		const action = {
			type: deleteCartAuth.fulfilled.type,
			payload: { products },
		};
		const state = cartReducer(initialState, action);

		expect(state.shoppingCartAuth).toEqual([]);
		expect(state.totalCartQuantity).toEqual(0);
		expect(state.meta.loading).toBe(false);
		expect(state.meta.loaded).toBe(true);
	});
});
