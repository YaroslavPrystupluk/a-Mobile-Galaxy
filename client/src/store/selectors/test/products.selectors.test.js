import {
	selectProductsData,
	selectProductsQuantity,
	selectLoader,
	selectStateProducts,
} from "../products.selectors";

const mockProducts = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];
const mockQuantity = 0;
describe("should products from state", () => {
	it("test selector selectProductsData", () => {
		expect(
			selectProductsData({
				products: {
					data: [
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
	it("test selector selectStateProducts", () => {
		expect(
			selectStateProducts({
				products: [
					{
						name: "TouYinger M4 FullHD",
						price: 3700,
						article: 12345,
						brand: "Apple",
					},
				],
			}),
		).toEqual(mockProducts);
	});

	it("test selector selectProductsQuantity", () => {
		expect(
			selectProductsQuantity({
				products: {
					dataQuantity: 0,
				},
			}),
		).toEqual(mockQuantity);
	});

	it("test selector selectLoader", () => {
		expect(
			selectLoader({
				products: {
					loader: true,
				},
			}),
		).not.toEqual(false);
	});
});
