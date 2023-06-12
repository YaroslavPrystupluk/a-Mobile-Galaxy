import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import { getLocalItem } from "../../helpers/getLocalItem";

const initialState = {
	favorite: JSON.parse(getLocalItem("favorites") || "[]"),
	favoritesAuth: [],
	meta: { loading: false, loaded: true, error: null },
};

export const postFavorites = createAsyncThunk(
	"favorites/postData",
	async (newWishlist, thunkAPI) => {
		try {
			return await axios.post(`${DOMAIN}/wishlist`, newWishlist);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	},
);
export const getFavorites = createAsyncThunk("favorites/getData", async (thunkAPI) => {
	try {
		const response = await axios.get(`${DOMAIN}/wishlist`, {
			headers: {
				Authorization: getLocalItem("token"),
			},
		});
		return response.data.products;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
export const updateFavorites = createAsyncThunk(
	"favorites/update",
	async (updatedWishlist, thunkAPI) => {
		try {
			const response = await axios.put(`${DOMAIN}/wishlist`, updatedWishlist);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const addToFavorites = createAsyncThunk(
	"favorites/addOneProduct",
	async (productId, updatedWishlist, thunkAPI) => {
		try {
			const response = await axios.put(`${DOMAIN}/wishlist/${productId}`, updatedWishlist);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const deleteFromFavorites = createAsyncThunk(
	"favorites/deleteProduct",
	async (productId, thunkAPI) => {
		try {
			const response = await axios.delete(`${DOMAIN}/wishlist/${productId}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);
export const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		setFavorite: (state, action) => {
			state.favorite = [...new Set([...state.favorite, action.payload])];
			localStorage.setItem("favorites", JSON.stringify(state.favorite));
		},
		removeItemFavorite: (state, action) => {
			state.favorite = state.favorite.filter((item) => item !== action.payload);
			localStorage.setItem("favorites", JSON.stringify(state.favorite));
		},
		clearFavorites: (state, action) => {
			state.favorite = [];
			localStorage.removeItem("favorites");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(postFavorites.pending, (state, action) => {
			state.meta = { ...state.meta, loading: true, loaded: false };
		});
		builder.addCase(postFavorites.fulfilled, (state, action) => {
			state.favoritesAuth = action.payload;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(getFavorites.pending, (state, action) => {
			state.meta = { ...state.meta, loading: true, loaded: false };
		});
		builder.addCase(getFavorites.fulfilled, (state, action) => {
			state.favoritesAuth = action.payload;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(getFavorites.rejected, (state, action) => {
			state.meta = {
				...state.meta,
				loading: false,
				loaded: false,
				error: action.payload,
			};
		});
		builder.addCase(addToFavorites.pending, (state, action) => {
			state.meta = { ...state.meta, loading: true, loaded: false };
		});
		builder.addCase(addToFavorites.fulfilled, (state, action) => {
			state.favoritesAuth = action.payload.products;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(updateFavorites.pending, (state, action) => {
			state.meta = { ...state.meta, loading: true, loaded: false };
		});
		builder.addCase(updateFavorites.fulfilled, (state, action) => {
			state.favoritesAuth = action.payload.products;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(deleteFromFavorites.fulfilled, (state, action) => {
			state.favoritesAuth = action.payload.products;
			state.meta = { ...state.meta, loading: false, loaded: true };
		});
		builder.addCase(updateFavorites.rejected, (state, action) => {
			state.meta = {
				...state.meta,
				loading: false,
				loaded: false,
				error: action.payload,
			};
		});
	},
});

export const { removeItemFavorite, setFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
