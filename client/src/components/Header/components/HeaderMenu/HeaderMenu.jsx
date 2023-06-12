import React from "react";
import { Button } from "@mui/material";
// eslint-disable-next-line import/named
import { CustomLink } from "./components/styled";
import MenuCatalog from "./components/MenuCatalog";
import MenuBayer from "./components/MenuBayer";
import MenuAbout from "./components/MenuAbout";
import MenuContact from "./components/MenuContact/MenuContact";

const HeaderMenu = React.memo(() => {
	return (
		<div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
			<CustomLink to="/">
				<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
					Головна
				</Button>
			</CustomLink>
			<MenuCatalog />
			<MenuBayer />
			<MenuAbout />
			<MenuContact />
		</div>
	);
});
export default HeaderMenu;
