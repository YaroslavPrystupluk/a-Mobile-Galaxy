import {
	selectOrderData,
	selectShippingData,
	selectAdressData,
	selectPaymentData,
} from "../orders.selectors";

const mockProducts = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];

describe("should order from state", () => {
	it("test selector selectOrderData", () => {
		expect(
			selectOrderData({
				orders: {
					orderData: [
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
	it("test selector selectShippingData", () => {
		expect(
			selectShippingData({
				orders: {
					shippingMethod: [
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

	it("test selector selectAdressData", () => {
		expect(
			selectAdressData({
				orders: {
					deliveryAdress: [
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

	it("test selector selectPaymentData", () => {
		expect(
			selectPaymentData({
				orders: {
					paymentMethod: [
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
});
