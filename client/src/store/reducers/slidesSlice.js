import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	slidesData: [],
	loader: true,
};

export const fetchSlides = createAsyncThunk("slides/fetchData", async (thunkAPI) => {
	try {
		const response = axios.get(`${DOMAIN}/slides`).then(({ data }) => data);
		return response;
	} catch {
		return thunkAPI.rejectWithValue(error);
	}
});

export const slidesSlice = createSlice({
	name: "slides",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchSlides.pending, (state) => {
			state.loader = true;
		});
		builder.addCase(fetchSlides.fulfilled, (state, action) => {
			state.slidesData = action.payload;
			state.loader = false;
		});
	},
});

export default slidesSlice.reducer;
