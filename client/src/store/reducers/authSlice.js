import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import setAuthToken from "../../config/setAuthToken";
import { getLocalItem } from "../../helpers/getLocalItem";
import { getFavorites } from "./favoriteSlice";
import { fetchCustomer } from "./getCustomerInfoSlice";
import { getCartAuth, updateCartFromNotAuthToAuth } from "./cartSlice";
import { updateNotAuthToAuthCart } from "../../helpers/updateNotAuthToAuthCart";

const initialState = {
	user: {},
	isAuth: false,
	tokenUser: "",
	meta: { loading: false, loaded: true, error: null },
};
export const fetchAuth = createAsyncThunk("user/login", async (object, thunkAPI) => {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios.post(`${DOMAIN}/customers/login`, object);
		localStorage.setItem("token", response.data.token);
		await thunkAPI.dispatch(getFavorites());
		await thunkAPI.dispatch(fetchCustomer());
		await thunkAPI.dispatch(getCartAuth());
		const { cart } = thunkAPI.getState();
		await thunkAPI.dispatch(
			updateCartFromNotAuthToAuth(
				updateNotAuthToAuthCart(cart.shoppingCart, cart.shoppingCartAuth),
			),
		);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const fetchRegister = createAsyncThunk("user/register", async (object, thunkAPI) => {
	try {
		const savedCustomer = await axios.post(`${DOMAIN}/customers`, object);
		return savedCustomer;
	} catch ({ message }) {
		console.log("message", message);

		return thunkAPI.rejectWithValue(message);
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload;
			if (state.isAuth) {
				state.tokenUser = getLocalItem("token");
			} else {
				state.tokenUser = "";
			}

			setAuthToken(state.tokenUser);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuth.pending, (state) => {
				state.meta = { ...state.meta, loading: true, loaded: false };
			})
			.addCase(fetchRegister.pending, (state) => {
				state.meta = { ...state.meta, loading: true, loaded: false };
			})
			.addCase(fetchAuth.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuth = true;
				state.meta = { ...state.meta, loading: false, loaded: true };
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.user = action.payload;
				state.meta = { ...state.meta, loading: false, loaded: true };
			})
			.addCase(fetchAuth.rejected, (state, action) => {
				state.isAuth = false;
				state.meta = {
					...state.meta,
					loading: false,
					loaded: false,
					error: action.payload,
				};
			})
			.addCase(fetchRegister.rejected, (state, { payload }) => {
				state.isAuth = false;
				state.meta = {
					...state.meta,
					loading: false,
					loaded: false,
					error: payload,
				};
			});
	},
});

export const { setIsAuth } = userSlice.actions;

export default userSlice.reducer;
