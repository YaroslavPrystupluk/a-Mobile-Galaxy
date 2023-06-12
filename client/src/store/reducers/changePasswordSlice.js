import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = { message: false };

export const fetchUpdatePassword = createAsyncThunk(
	"customerInfo/fetchUpdatePassword",
	async (passwords, thunkAPI) => {
		const res = axios.put(`${DOMAIN}/customers/password`, passwords);
		return res;
	},
);
export const updateCustomerPasswordSlice = createSlice({
	name: "updateCustomerPassword",
	initialState,
	reducers: {
		removeMessage: (state, action) => {
			state.message = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUpdatePassword.fulfilled, (state, action) => {
			state.message = true;
		});
	},
});
export const { removeMessage } = updateCustomerPasswordSlice.actions;
export default updateCustomerPasswordSlice.reducer;
