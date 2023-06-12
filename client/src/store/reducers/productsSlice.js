// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	data: [],
	params: "",
	dataQuantity: 0,
	loader: false,
};

export const fetchProducts = createAsyncThunk("products/fetchData", async (filters) => {
	let url = `${DOMAIN}/products`;
	if (filters) {
		url = `${url}/filter?${filters}`;
	}
	const response = await axios.get(url).then(({ data }) => data);
	return response;
});

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		removeProduct: (state, action) => {
			state.data = state.data.filter((item) => item.id !== action.payload);
		},
		setParams: (state, action) => {
			state.params = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loader = true;
			state.data = [];
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			if (action.payload.products) {
				state.data = action.payload.products;
				state.dataQuantity = action.payload.productsQuantity;
			} else {
				state.data = action.payload;
			}
			state.loader = false;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loader = false;
			state.Error = action.payload;
		});
	},
});
export const { removeProduct, setParams } = productsSlice.actions;

export default productsSlice.reducer;
