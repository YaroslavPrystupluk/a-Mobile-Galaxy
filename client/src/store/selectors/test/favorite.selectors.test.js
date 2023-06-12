import { selectFavorite } from "../favorite.selectors";

const mockFavorite = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];

describe("should select favorite from state", () => {
	it("test selector selectFavorites", () => {
		expect(
			selectFavorite({
				favorite: {
					favorite: [
						{
							name: "TouYinger M4 FullHD",
							price: 3700,
							article: 12345,
							brand: "Apple",
						},
					],
				},
			}),
		).toEqual(mockFavorite);
	});
});
