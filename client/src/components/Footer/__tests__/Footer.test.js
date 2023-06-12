import { toBeInTheDocument } from "@testing-library/jest-dom";
import { screen, getByTestId, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";

describe("Footer", () => {
	it("should create footer", () => {
		const utils = render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>,
		);

		const listElement = screen.getByTestId("list-menu");
		expect(listElement).toBeInTheDocument();
		expect(utils).toMatchSnapshot();
	});
});
