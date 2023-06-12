import React from "react";
import { Button } from "@mui/material";
import { CustomLink } from "../styled";

const MenuContact = () => {
	return (
		<>
			<CustomLink to="/contacts">
				<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
					Контакти
				</Button>
			</CustomLink>
		</>
	);
};

export default MenuContact;
