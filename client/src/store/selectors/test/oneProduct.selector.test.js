import { selectorPageObj, selectorLoading } from "../oneProduct.selector";

const mockProducts = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];

describe("should one product from state", () => {
	it("test selector selectorPageObj", () => {
		expect(
			selectorPageObj({
				oneProduct: {
					pageObj: [
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

	it("test selector  selectorLoading", () => {
		expect(
			selectorLoading({
				oneProduct: {
					loading: true,
				},
			}),
		).not.toEqual(false);
	});
});
