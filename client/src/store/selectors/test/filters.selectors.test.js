import { selectorArrFilters, selectorLoad } from "../filters.selectors";

const mockProducts = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];

describe("should filters from state", () => {
	it("test selector selectorArrFilters", () => {
		expect(
			selectorArrFilters({
				filters: {
					arrFilters: [
						{
							name: "TouYinger M4 FullHD",
							price: 3700,
							article: 12345,
							brand: "Apple",
						},
					],
				},
			}),
		).toEqual(mockProducts);
	});

	it("test selector  selectorLoad", () => {
		expect(
			selectorLoad({
				filters: {
					load: true,
				},
			}),
		).not.toEqual(false);
	});
});
