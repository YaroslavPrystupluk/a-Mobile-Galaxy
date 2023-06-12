import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	pageObj: {},
	loading: false,
};

const oneProductSlice = createSlice({
	name: "oneProducts",
	initialState,
	reducers: {
		actionPage: (state, { payload }) => {
			state.pageObj = { ...payload };
		},
		actionLoading: (state, { payload }) => {
			state.loading = payload;
		},
	},
});
export const { actionPage, actionLoading } = oneProductSlice.actions;

export const actionFetchProduct = (id) => (dispatch) => {
	dispatch(actionLoading(true));
	return axios.get(`${DOMAIN}/products/${id}`).then(({ data }) => {
		dispatch(actionPage(data));
		dispatch(actionLoading(false));
	});
};

export default oneProductSlice.reducer;
