import React from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const CustomizedMenu = styled(Menu)`
	& .MuiMenu-paper {
		width: 100%;
	}
`;

const CustomLink = styled(NavLink)(({ theme }) => ({
	color: "inherit",
	textDecoration: "none",
	"&: hover": {
		textDecoration: "underline",
	},
}));

const BurgerMenu = React.memo(() => {
	const [burgerMenu, setBurgerMenu] = React.useState(null);
	const openBurgerMenu = Boolean(burgerMenu);

	const handleClickBurgerMenu = (event) => {
		setBurgerMenu(event.currentTarget);
	};
	const handleCloseBurgerMenu = () => {
		setBurgerMenu(null);
	};

	return (
		<Box sx={{ display: { xs: "block", sm: "none" } }}>
			<IconButton
				sx={{ p: "15px 0", display: { xs: "block", sm: "none" } }}
				id="button-burgerMenu"
				aria-controls={openBurgerMenu ? "menu-burgerMenu" : undefined}
				aria-haspopup="true"
				aria-expanded={openBurgerMenu ? "true" : undefined}
				onClick={handleClickBurgerMenu}
			>
				{!burgerMenu ? (
					<MenuIcon fontSize="large" color="grey" />
				) : (
					<CloseIcon fontSize="large" color="grey" />
				)}
			</IconButton>
			<CustomizedMenu
				sx={{ display: { xs: "block", sm: "none" } }}
				id="menu-burgerMenu"
				anchorEl={burgerMenu}
				open={openBurgerMenu}
				onClose={handleCloseBurgerMenu}
				MenuListProps={{
					"aria-labelledby": "button-burgerMenu",
				}}
			>
				<CustomLink to="/">
					<MenuItem divider onClick={handleCloseBurgerMenu}>
						Головна
					</MenuItem>
				</CustomLink>
				<CustomLink to="/products">
					<MenuItem divider onClick={handleCloseBurgerMenu}>
						Каталог
					</MenuItem>
				</CustomLink>
				<CustomLink to="/guarantee">
					<MenuItem divider onClick={handleCloseBurgerMenu}>
						Гарантія
					</MenuItem>
				</CustomLink>
				<CustomLink to="/paymentAndDelivery">
					<MenuItem divider onClick={handleCloseBurgerMenu}>
						Оплата та доставка
					</MenuItem>
				</CustomLink>
				<CustomLink to="/exchangeAndReturn">
					<MenuItem divider onClick={handleCloseBurgerMenu}>
						Обмін та повернення
					</MenuItem>
				</CustomLink>
				<CustomLink to="/contacts">
					<MenuItem divider onClick={handleCloseBurgerMenu}>
						Контакти
					</MenuItem>
				</CustomLink>
			</CustomizedMenu>
		</Box>
	);
});

export default BurgerMenu;
