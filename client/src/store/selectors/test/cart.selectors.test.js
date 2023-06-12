import { selectShoppingCart, selectTotalCartQuantity, selectTotalCartSum } from "../cart.selectors";

const mockProducts = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];
const mockQuantity = [{ totalCartQuantity: 0 }];
const mockSumm = [{ totalCartSum: 0 }];

describe("should cart from state", () => {
	it("test selector selectShoppingCart", () => {
		expect(
			selectShoppingCart({
				cart: {
					shoppingCart: [
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

	it("test selector selectTotalCartQuantity", () => {
		expect(
			selectTotalCartQuantity({
				cart: {
					totalCartQuantity: [
						{
							totalCartQuantity: 0,
						},
					],
				},
			}),
		).toEqual(mockQuantity);
	});

	it("test selector selectTotalCartSum", () => {
		expect(
			selectTotalCartSum({
				cart: {
					totalCartSum: [
						{
							totalCartSum: 0,
						},
					],
				},
			}),
		).toEqual(mockSumm);
	});
});
