import {
	configureStore,
	getDefaultMiddleware,
	createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Iterable } from "immutable";
import productsReducer from "./reducers/productsSlice";
import oneProductsReducer from "./reducers/oneProductSlice";
import slidesReducer from "./reducers/slidesSlice";
import modalReducer from "./reducers/modalSlice";
import authReducer from "./reducers/authSlice";
import ordersReducer from "./reducers/ordersSlice";
import searchReducer from "./reducers/searchSlice";
import filtersReducer from "./reducers/filtersSlice";
import cartReducer from "./reducers/cartSlice";
import favoriteReducer from "./reducers/favoriteSlice";
import customerReducer from "./reducers/getCustomerInfoSlice";
import updateInfoReducer from "./reducers/updateUserInfoSlice";
import updatePasswordReducer from "./reducers/changePasswordSlice";

const isPlainObject = (value) =>
	typeof value === "object" &&
	value !== null &&
	!Array.isArray(value) &&
	!(value instanceof Map) &&
	!(value instanceof Set);

const serialize = (value) => {
	if (Iterable.isIterable(value)) {
		return value.toJS();
	}
	if (isPlainObject(value)) {
		return Object.entries(value).reduce(
			(acc, [key, val]) => ({ ...acc, [key]: serialize(val) }),
			{},
		);
	}
	return value;
};

const middleware = [
	...getDefaultMiddleware({
		thunk: true,
		immutableCheck: true,
		serializableCheck: {
			ignoredActions: ["customerInfo/fetchUpdateCustomerInfo/fulfilled"],
			ignoredPaths: ["payload.headers"],
			serializer: serialize,
		},
	}),
	createSerializableStateInvariantMiddleware(),
];

const store = configureStore({
	reducer: {
		auth: authReducer,
		customerInfo: updateInfoReducer,
		changePassword: updatePasswordReducer,
		customer: customerReducer,
		products: productsReducer,
		slides: slidesReducer,
		oneProduct: oneProductsReducer,
		cart: cartReducer,
		modal: modalReducer,
		orders: ordersReducer,
		search: searchReducer,
		filters: filtersReducer,
		favorite: favoriteReducer,
	},
	middleware,
});

export default store;
