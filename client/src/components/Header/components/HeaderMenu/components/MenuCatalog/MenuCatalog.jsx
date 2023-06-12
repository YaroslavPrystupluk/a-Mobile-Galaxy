import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
// eslint-disable-next-line import/extensions
import { CustomLink } from "../styled";
import { clearSearch } from "../../../../../../store/reducers/searchSlice";

const MenuCatalog = () => {
	return (
		<>
			<CustomLink to="/products">
				<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
					Каталог
				</Button>
			</CustomLink>
		</>
	);
};

export default MenuCatalog;
