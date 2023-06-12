import React from "react";
import { Button } from "@mui/material";
import { CustomLink } from "../styled";

const MenuAbout = () => {
	return (
		<>
			<CustomLink to="/about">
				<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
					Про нас
				</Button>
			</CustomLink>
		</>
	);
};

export default MenuAbout;
