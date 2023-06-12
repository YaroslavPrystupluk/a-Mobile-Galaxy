import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import { clearCart, deleteCartAuth, getCartAuth } from "./cartSlice";
import { setOrderNo } from "./modalSlice";

const initialState = {
	orderData: "",
	orderProducts: [],
	orderNo: 0,
	meta: { loading: false, loaded: true, error: null, dataSent: false, order: false },
};

export const createOrder = createAsyncThunk(
	"orders/postData",
	async (obj, { dispatch, rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const response = await axios.post(`${DOMAIN}/orders`, obj).then(({ data }) => data);
			dispatch(setOrderNo(response.order.orderNo));
			if (auth.isAuth) {
				dispatch(deleteCartAuth());
			} else {
				dispatch(clearCart());
			}

			return response;
		} catch {
			return rejectWithValue(error);
		}
	},
);

export const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrderData: (state, action) => {
			state.orderData = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createOrder.pending, (state) => {
			state.meta = { ...state.meta, loading: true, loaded: false, dataSent: false };
		});
		builder.addCase(createOrder.fulfilled, (state, action) => {
			state.orderProducts = action.payload;
			state.meta = {
				...state.meta,
				loading: false,
				loaded: true,
				dataSent: true,
			};
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			state.meta = {
				...state.meta,
				loading: false,
				loaded: false,
				dataSent: false,
				error: action.payload,
			};
		});
	},
});

export const { setOrderData } = ordersSlice.actions;
export default ordersSlice.reducer;
