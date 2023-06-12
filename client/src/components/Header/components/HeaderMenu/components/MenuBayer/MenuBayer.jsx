import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { CustomLink } from "../styled";

const MenuBayer = () => {
	const [bayer, setBayer] = React.useState(null);
	const openBayer = Boolean(bayer);
	const handleClickBayer = (event) => {
		setBayer(event.currentTarget);
	};
	const handleCloseBayer = () => {
		setBayer(null);
	};

	return (
		<>
			<Button
				id="button-bayer"
				aria-controls={openBayer ? "menu-bayer" : undefined}
				aria-haspopup="true"
				aria-expanded={openBayer ? "true" : undefined}
				onClick={handleClickBayer}
				sx={{ padding: { sm: "20px 25px", md: "20px 35px" } }}
			>
				Покупцям
			</Button>
			<Menu
				id="menu-bayer"
				anchorEl={bayer}
				open={openBayer}
				onClose={handleCloseBayer}
				MenuListProps={{
					"aria-labelledby": "button-bayer",
				}}
			>
				<CustomLink to="/guarantee">
					<MenuItem divider onClick={handleCloseBayer}>
						Гарантія
					</MenuItem>
				</CustomLink>
				<CustomLink to="/paymentAndDelivery">
					<MenuItem divider onClick={handleCloseBayer}>
						Оплата та доставка
					</MenuItem>
				</CustomLink>
				<CustomLink to="/exchangeAndReturn">
					<MenuItem divider onClick={handleCloseBayer}>
						Обмін та повернення
					</MenuItem>
				</CustomLink>
			</Menu>
		</>
	);
};

export default MenuBayer;
