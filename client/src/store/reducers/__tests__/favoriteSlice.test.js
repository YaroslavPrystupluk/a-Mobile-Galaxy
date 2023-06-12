import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { waitFor } from "@testing-library/react";
import favoriteReducer, {
	postFavorites,
	getFavorites,
	updateFavorites,
	addToFavorites,
	deleteFromFavorites,
	setFavorite,
	removeItemFavorite,
	clearFavorites,
} from "../favoriteSlice";
import { getLocalItem } from "../../../helpers/getLocalItem";

const mockProduct = {
	id: "22222",
	name: "Apple iPhone 13 128gb",
	brand: "Apple",
	imageUrls: [
		"https://res.cloudinary.com/dsx708og4/image/upload/v1676278622/Lori_pro…",
		"https://res.cloudinary.com/dsx708og4/image/upload/v1676278622/Lori_pro…",
		"https://res.cloudinary.com/dsx708og4/image/upload/v1676278627/Lori_pro…",
		"https://res.cloudinary.com/dsx708og4/image/upload/v1676278632/Lori_pro…",
	],
	currentPrice: 56999,
	popular: false,
};

jest.mock("axios");

describe("favoriteSlice", () => {
	it("should postFavorites with resolved response", async () => {
		axios.post.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = postFavorites();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(postFavorites.pending().type);
		expect(end[0].type).toEqual(postFavorites.fulfilled().type);
	});

	it("should handle error and reject with error message postFavorites", async () => {
		const thunkAPI = {
			rejectWithValue: jest.fn(),
		};
		const error = new Error("fetch failed");
		axios.post.mockRejectedValueOnce(error);

		const dispatch = jest.fn();
		const thunk = postFavorites();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(postFavorites.pending().type);
		expect(end[0].type).toEqual(postFavorites.rejected().type);
		expect(end[0].meta.rejectedWithValue).toEqual(true);
	});

	it("should getFavorites with resolved response", async () => {
		axios.get.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = getFavorites();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(getFavorites.pending().type);
	});

	it("should handle error and reject with error message getFavorites", async () => {
		const thunkAPI = {
			rejectWithValue: jest.fn(),
		};
		const error = new Error("fetch failed");
		axios.get.mockRejectedValueOnce(error);

		const dispatch = jest.fn();
		const thunk = getFavorites();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(getFavorites.pending().type);
		expect(end[0].type).toEqual(getFavorites.rejected().type);
		expect(end[0].meta.rejectedWithValue).toEqual(false);
	});

	it("should updateFavorites with resolved response", async () => {
		axios.put.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = updateFavorites();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(updateFavorites.pending().type);
		expect(end[0].type).toEqual(updateFavorites.fulfilled().type);
	});

	it("should handle error and reject with error message updateFavorites", async () => {
		const thunkAPI = {
			rejectWithValue: jest.fn(),
		};
		const error = new Error("fetch failed");
		axios.put.mockRejectedValueOnce(error);

		const dispatch = jest.fn();
		const thunk = updateFavorites();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(updateFavorites.pending().type);
		expect(end[0].type).toEqual(updateFavorites.rejected().type);
		expect(end[0].meta.rejectedWithValue).toEqual(false);
	});

	it("should addToFavorites with resolved response", async () => {
		axios.put.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = addToFavorites();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(addToFavorites.pending().type);
		expect(end[0].type).toEqual(addToFavorites.fulfilled().type);
	});

	it("should handle error and reject with error message addToFavorites", async () => {
		const thunkAPI = {
			rejectWithValue: jest.fn(),
		};
		const error = new Error("fetch failed");
		axios.put.mockRejectedValueOnce(error);

		const dispatch = jest.fn();
		const thunk = addToFavorites();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(addToFavorites.pending().type);
		expect(end[0].type).toEqual(addToFavorites.rejected().type);
		expect(end[0].meta.rejectedWithValue).toEqual(false);
	});

	it("should deleteFromFavorites with resolved response", async () => {
		axios.delete.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockProduct),
		});

		const dispatch = jest.fn();

		const thunk = deleteFromFavorites();

		await thunk(dispatch, () => {});
		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(deleteFromFavorites.pending().type);
		expect(end[0].type).toEqual(deleteFromFavorites.fulfilled().type);
	});

	it("should handle error and reject with error message deleteFromFavorites", async () => {
		const thunkAPI = {
			rejectWithValue: jest.fn(),
		};
		const error = new Error("fetch failed");
		axios.delete.mockRejectedValueOnce(error);

		const dispatch = jest.fn();
		const thunk = deleteFromFavorites();

		await thunk(dispatch, () => ({}));

		const { calls } = dispatch.mock;
		expect(calls).toHaveLength(2);

		const [start, end] = calls;

		expect(start[0].type).toEqual(deleteFromFavorites.pending().type);
		expect(end[0].type).toEqual(deleteFromFavorites.rejected().type);
		expect(end[0].meta.rejectedWithValue).toEqual(false);
	});

	it("should return default state when passed an empty actions", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const result = favoriteReducer(undefined, { type: "" });

		expect(result).toEqual(initialState);
	});

	it("should add new goods to favorites 'setFavorite' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const action = { type: setFavorite.type, payload: mockProduct };
		const result = favoriteReducer(initialState, action);

		expect(result.favorite).toEqual([mockProduct]);
	});

	it("should remove goods to favorites by id 'removeItemFavorite' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const action = { type: removeItemFavorite.type, payload: mockProduct };
		const result = favoriteReducer(initialState, action);
		expect(result.favorite).toEqual([mockProduct]);
	});

	it("should remove item from favorites", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const action = { type: removeItemFavorite.type, payload: mockProduct };
		const expectedState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		expect(favoriteReducer(initialState, action)).toEqual(expectedState);
	});

	it("should delete goods to search 'clearFavorites' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const action = { type: clearFavorites.type, payload: [] };
		const result = favoriteReducer(initialState, action);

		expect(result.favorite).toEqual([]);
	});

	it("should change status with 'postFavorites.pending' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, postFavorites.pending());

		expect(state.meta.loaded).toEqual(false);
		expect(state.meta.loading).toEqual(true);
	});

	it("should fetch goods with 'postFavorites.fulfilled' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, postFavorites.fulfilled(mockProduct));

		expect(state.meta.loaded).toEqual(true);
		expect(state.meta.loading).toEqual(false);
		expect(state.favoritesAuth).toEqual(mockProduct);
	});

	it("should change status with 'getFavorites.pending' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, getFavorites.pending());

		expect(state.meta.loaded).toEqual(false);
		expect(state.meta.loading).toEqual(true);
	});

	it("should fetch goods with 'getFavorites.fulfilled' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, getFavorites.fulfilled(mockProduct));

		expect(state.meta.loaded).toEqual(true);
		expect(state.meta.loading).toEqual(false);
		expect(state.favoritesAuth).toEqual(mockProduct);
	});
	it("should fetch goods with 'getFavorites.rejected' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const action = {
			type: getFavorites.rejected.type,
			payload: "Server Error !",
		};

		const state = favoriteReducer(initialState, action);

		expect(state.meta.loaded).toEqual(false);
		expect(state.meta.loading).toEqual(false);
		expect(state.favoritesAuth).toEqual([]);
		expect(state.meta.error).toEqual("Server Error !");
	});

	it("should change status with 'addToFavorites.pending' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, addToFavorites.pending());

		expect(state.meta.loaded).toEqual(false);
		expect(state.meta.loading).toEqual(true);
	});

	it("should fetch goods with 'addToFavorites.fulfilled' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, addToFavorites.fulfilled(mockProduct));

		expect(state.meta.loaded).toEqual(true);
		expect(state.meta.loading).toEqual(false);
	});

	it("should change status with 'updateFavorites.pending' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, updateFavorites.pending());

		expect(state.meta.loaded).toEqual(false);
		expect(state.meta.loading).toEqual(true);
	});

	it("should fetch goods with 'updateFavorites.fulfilled' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, updateFavorites.fulfilled(mockProduct));
		expect(state.meta.loaded).toEqual(true);
		expect(state.meta.loading).toEqual(false);
	});

	it("should fetch goods with 'updateFavorites.rejected' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const action = {
			type: updateFavorites.rejected.type,
			payload: "Server Error !",
		};

		const state = favoriteReducer(initialState, action);

		expect(state.meta.loaded).toEqual(false);
		expect(state.meta.loading).toEqual(false);
		expect(state.favoritesAuth).toEqual([]);
		expect(state.meta.error).toEqual("Server Error !");
	});

	it("should fetch goods with 'deleteFromFavorites.fulfilled' action", () => {
		const initialState = {
			favorite: JSON.parse(getLocalItem("favorites") || "[]"),
			favoritesAuth: [],
			meta: { loading: false, loaded: true, error: null },
		};
		const state = favoriteReducer(initialState, deleteFromFavorites.fulfilled(mockProduct));

		expect(state.meta.loaded).toEqual(true);
		expect(state.meta.loading).toEqual(false);
	});
});
