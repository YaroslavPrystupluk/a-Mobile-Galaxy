import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import { getLocalItem } from "../../helpers/getLocalItem";

const initialState = {
	shoppingCart: JSON.parse(getLocalItem("cart") || "{}"),
	shoppingCartAuth: [],
	cartAuthTotalSum: 0,
	totalCartQuantity: 0,
	totalCartSum: JSON.parse(getLocalItem("totalCartSum") || 0),
	meta: { loading: false, loaded: true, error: null },
};
//When the page reloads, totalCartQuantity is recalculated through
// the shoppingCart object, otherwise totalCartQuantity = 0
Object.keys(initialState.shoppingCart).forEach((key) => {
	initialState.totalCartQuantity += initialState.shoppingCart[key];
});
export const getCartAuth = createAsyncThunk("cart/getData", async (thunkAPI) => {
	try {
		const response = await axios.get(`${DOMAIN}/cart`);
		return response.data.products;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const addOneProductAuth = createAsyncThunk(
	"cart/addOneProductAuth",
	async (id, thunkAPI) => {
		try {
			const response = await axios.put(`${DOMAIN}/cart/${id}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
export const deleteOneProduct = createAsyncThunk("cart/deleteOneProduct", async (id, thunkAPI) => {
	try {
		const response = await axios.delete(`${DOMAIN}/cart/${id}`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const decreaseAmountAuth = createAsyncThunk(
	"cart/decreaseAmountAuth",
	async (id, thunkAPI) => {
		try {
			const response = await axios.delete(`${DOMAIN}/cart/product/${id}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const deleteCartAuth = createAsyncThunk("cart/deleteCartAuth", async (thunkAPI) => {
	try {
		const response = await axios.delete(`${DOMAIN}/cart`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const updateCartFromNotAuthToAuth = createAsyncThunk(
	"cart/updateCart",
	async (updatedCart, thunkAPI) => {
		try {
			const response = await axios.put(`${DOMAIN}/cart`, updatedCart);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addShoppingCart: (state, action) => {
			if (!state.shoppingCart[action.payload]) {
				state.shoppingCart = { ...state.shoppingCart, [action.payload]: 1 };
				state.totalCartQuantity = 0;
				Object.keys(state.shoppingCart).forEach((key) => {
					state.totalCartQuantity += state.shoppingCart[key];
				});
			}
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
		removeItemShoppingCart: (state, action) => {
			if (state.shoppingCart[action.payload]) {
				delete state.shoppingCart[action.payload];
				state.totalCartQuantity = 0;
				Object.keys(state.shoppingCart).forEach((key) => {
					state.totalCartQuantity += state.shoppingCart[key];
				});
			}
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
		addQuantityToShoppingCart: (state, action) => {
			if (state.shoppingCart[action.payload.itemNo]) {
				let newVal = state.shoppingCart[action.payload.itemNo] + action.payload.addToQty;
				if (newVal < 1) {
					newVal = 1;
				}
				state.shoppingCart = { ...state.shoppingCart, [action.payload.itemNo]: newVal };
				state.totalCartQuantity = 0;
				Object.keys(state.shoppingCart).forEach((key) => {
					state.totalCartQuantity += state.shoppingCart[key];
				});
			}
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
		setTotalCartSum: (state, action) => {
			state.totalCartSum = action.payload;
		},
		clearCart: (state) => {
			state.shoppingCart = [];
			state.totalCartQuantity = 0;
			state.totalCartSum = 0;
			localStorage.removeItem("cart");
			localStorage.removeItem("totalCartSum");
		},
		getTotatlAuthCartSum: (state, action) => {
			state.cartAuthTotalSum = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addOneProductAuth.pending, (state, action) => {
			state.meta = { ...state.meta, loading: false, loaded: false };
		});
		builder.addCase(addOneProductAuth.fulfilled, (state, action) => {
			state.shoppingCartAuth = action.payload.products;
			state.totalCartQuantity = 0;
			state.shoppingCartAuth.forEach(
				(itemProduct) => (state.totalCartQuantity += itemProduct.cartQuantity),
			);
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(addOneProductAuth.rejected, (state, action) => {
			state.meta = {
				...state.meta,
				loading: false,
				loaded: false,
				error: action.payload,
			};
		});
		builder.addCase(deleteOneProduct.fulfilled, (state, action) => {
			state.shoppingCartAuth = action.payload.products;
			state.totalCartQuantity = 0;
			state.shoppingCartAuth.forEach(
				(itemProduct) => (state.totalCartQuantity += itemProduct.cartQuantity),
			);
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(decreaseAmountAuth.fulfilled, (state, action) => {
			state.shoppingCartAuth = action.payload.products;
			state.totalCartQuantity = 0;
			state.shoppingCartAuth.forEach(
				(itemProduct) => (state.totalCartQuantity += itemProduct.cartQuantity),
			);
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(getCartAuth.pending, (state, action) => {
			state.meta = { ...state.meta, loading: true, loaded: false };
		});
		builder.addCase(getCartAuth.fulfilled, (state, action) => {
			state.shoppingCartAuth = action.payload;
			state.totalCartQuantity = 0;
			state.shoppingCartAuth.forEach(
				(itemProduct) => (state.totalCartQuantity += itemProduct.cartQuantity),
			);
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(deleteCartAuth.fulfilled, (state, action) => {
			state.shoppingCartAuth = [];
			state.totalCartQuantity = 0;
			state.cartAuthTotalSum = 0;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(getCartAuth.rejected, (state, action) => {
			state.meta = {
				...state.meta,
				loading: false,
				loaded: false,
				error: action.payload,
			};
		});
		builder.addCase(updateCartFromNotAuthToAuth.fulfilled, (state, action) => {
			state.shoppingCartAuth = action.payload.products;
			state.totalCartQuantity = 0;
			state.shoppingCartAuth.forEach(
				(itemProduct) => (state.totalCartQuantity += itemProduct.cartQuantity),
			);
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(updateCartFromNotAuthToAuth.rejected, (state, action) => {
			state.meta = {
				...state.meta,
				loading: false,
				loaded: false,
				error: action.payload,
			};
		});
	},
});
export const {
	removeItemShoppingCart,
	addShoppingCart,
	setTotalCartSum,
	addQuantityToShoppingCart,
	clearCart,
	getTotatlAuthCartSum,
} = cartSlice.actions;
export default cartSlice.reducer;
