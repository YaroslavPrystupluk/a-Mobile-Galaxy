import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	historyOrders: [],
};

export const historyOrder = createAsyncThunk("orders/historyOrders", async () => {
	await axios.get(`${DOMAIN}/orders`).then(({ data }) => data);
});
