import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const сontact = {
	fontSize: "14px",
};

export const menuTitle = {
	fontSize: "16px",
	fontWeight: "700",
	p: " 0 0 17px 0",
	textTransform: "uppercase",
};

export const CustomLink = styled(NavLink)(({ theme }) => ({
	color: "#ffffff",
	fontSize: "14px",
	textDecoration: "none",
	padding: "0",
	"&: hover": {
		textDecoration: "underline",
	},
}));

export const menuLinkItem = {
	color: "#ffffff",
	fontSize: "32px",
};
