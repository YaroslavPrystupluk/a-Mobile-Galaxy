import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "settingModal",
	initialState: { value: [], orderNo: null },
	reducers: {
		setModal: (state, action) => {
			state.value = action.payload;
		},
		setOrderNo: (state, action) => {
			state.orderNo = action.payload;
		},
	},
});
export const { setModal, setOrderNo } = modalSlice.actions;
export default modalSlice.reducer;
