import {
	selectAuth,
	selectAuthLoader,
	selectAuthUserToken,
	selectUserID,
	selectUser,
} from "../auth.selectors";

const mockProducts = [{ name: "TouYinger M4 FullHD", price: 3700, article: 12345, brand: "Apple" }];
const mockQuantity = [{ totalCartQuantity: 0 }];
const mockSumm = [{ totalCartSum: 0 }];

describe("should auth from state", () => {
	it("test selector selectAuth", () => {
		expect(
			selectAuth({
				auth: [
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

	it("test selector selectAuthUserToken", () => {
		expect(
			selectAuthUserToken({
				auth: {
					tokenUser: [
						{
							totalCartQuantity: 0,
						},
					],
				},
			}),
		).toEqual(mockQuantity);
	});

	it("test selector selectAuthLoader", () => {
		expect(
			selectAuthLoader({
				auth: {
					loader: true,
				},
			}),
		).not.toEqual(false);
	});

	it("test selector selectUser", () => {
		expect(
			selectUser({
				auth: {
					user: [
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
	it("test selector selectUserID", () => {
		expect(
			selectUserID({
				auth: {
					user: {
						id: [
							{
								name: "TouYinger M4 FullHD",
								price: 3700,
								article: 12345,
								brand: "Apple",
							},
						],
					},
				},
			}),
		).toEqual(mockProducts);
	});
});
