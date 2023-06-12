import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import RootRouters from "../Router/Router";
import theme from "../theming";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setModal } from "../store/reducers/modalSlice";
// eslint-disable-next-line import/named
import { modals } from "../components/Modal/configs";
// eslint-disable-next-line import/named
import { WrapperStyled } from "./styled";

const App = () => {
	const modal = useSelector((state) => state.modal.value);

	const dispatch = useDispatch();
	const actionModalHandler = (status) => {
		dispatch(setModal(status));
	};

	const activeModal = modals[modal] ?? null;
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<WrapperStyled>
					{activeModal}
					<Header modal={actionModalHandler} />
					<RootRouters />
					<Footer />
				</WrapperStyled>
			</BrowserRouter>
		</ThemeProvider>
	);
};
export default App;
