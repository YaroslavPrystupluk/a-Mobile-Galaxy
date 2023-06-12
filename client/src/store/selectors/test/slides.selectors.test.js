import { selectSlidesData, selectSlidesLoader } from "../slides.selectors";

const mockSlides = [
	{
		title: "iPhone 14 Pro Max",
		description: "Не пропустіть нашу гарячу пропозицію!",
		dark: true,
	},
];

describe("should select slider from state", () => {
	it("test selector  selectSlidesData", () => {
		expect(
			selectSlidesData({
				slides: {
					slidesData: [
						{
							title: "iPhone 14 Pro Max",
							description: "Не пропустіть нашу гарячу пропозицію!",
							dark: true,
						},
					],
				},
			}),
		).toEqual(mockSlides);
	});
	it("test selector  selectSlidesLoader", () => {
		expect(
			selectSlidesLoader({
				slides: {
					loader: true,
				},
			}),
		).not.toEqual(false);
	});
});
