import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	matchedProductsQuantity: 0,
	searchProducts: [],
	loader: false,
};
export const fetchSearchProducts = createAsyncThunk("products/search", async (searchPhrases) => {
	const response = await axios.post(`${DOMAIN}/products/search`, searchPhrases);
	return response.data;
});
export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		actionSetSearchProduct: (state, action) => {
			state.searchProducts.push(action.payload);
		},
		clearSearch: (state) => {
			state.searchProducts = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSearchProducts.pending, (state) => {
			state.searchProducts = [];
			state.loader = true;
		});
		builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
			state.matchedProductsQuantity = action.payload.matchedProductsQuantity;
			state.searchProducts = action.payload.matchedProducts;
			state.loader = false;
		});
		builder.addCase(fetchSearchProducts.rejected, (state, action) => {
			state.loader = false;
			state.Error = action.payload;
		});
	},
});
export const { clearSearch, actionSetSearchProduct } = searchSlice.actions;

export default searchSlice.reducer;
