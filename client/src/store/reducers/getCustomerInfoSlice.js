import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import setAuthToken from "../../config/setAuthToken";

const initialState = { customer: {}, meta: { loading: false, loaded: true } };

export const fetchCustomer = createAsyncThunk("customer/fetchCustomer", async () => {
	const token = localStorage.getItem("token");
	setAuthToken(token);
	const response = await axios.get(`${DOMAIN}/customers/customer`, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
});
export const customerSlice = createSlice({
	name: "customer",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchCustomer.pending, (state, action) => {
			state.meta = { ...state.meta, loading: true, loaded: false };
		});
		builder.addCase(fetchCustomer.fulfilled, (state, action) => {
			state.customer = action.payload;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
	},
});

export default customerSlice.reducer;
