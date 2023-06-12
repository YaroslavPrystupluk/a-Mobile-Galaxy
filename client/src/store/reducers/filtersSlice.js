import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	arrFilters: [],
	load: false,
};

const filtersSlice = createSlice({
	name: "filtersSlice",
	initialState,
	reducers: {
		actionFilters: (state, action) => {
			state.arrFilters = action.payload || {};
		},
		actionLoad: (state, { payload }) => {
			state.load = payload;
		},
		clearFilters: (state, action) => {
			state.arrFilters = [];
		},
	},
});
export const { actionLoad, actionFilters, clearFilters } = filtersSlice.actions;

export const actionFetchFilters =
	(signal, searchParams, type = "agregate") =>
	(dispatch) => {
		dispatch(actionLoad(true));

		const stringPath = !searchParams?.toString().trim()
			? `${DOMAIN}/filters/${type}`
			: `${DOMAIN}/filters/${type}?${searchParams.toString()}`;

		axios(stringPath, { signal })
			.then((res) => {
				if (type === "agregate") {
					dispatch(actionFilters(res.data[0]));
				} else {
					dispatch(actionFilters(res.data));
				}
				dispatch(actionLoad(false));
			})
			.catch((err) => {
				// console.warn(err);
			});
	};

export default filtersSlice.reducer;
