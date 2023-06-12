import { selectSearch, selectSearchLoader } from "../search.selector";

const mocksearch = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];

describe("should search from state", () => {
	it("test selector selectSearch", () => {
		expect(
			selectSearch({
				search: {
					searchProducts: [
						{
							name: "TouYinger M4 FullHD",
							price: 3700,
							article: 12345,
							brand: "Apple",
						},
					],
				},
			}),
		).toEqual(mocksearch);
	});
	it("test selector  selectSlidesLoader", () => {
		expect(
			selectSearchLoader({
				search: {
					loader: true,
				},
			}),
		).not.toEqual(false);
	});
});
