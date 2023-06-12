import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const CustomLink = styled(NavLink)(({ theme }) => ({
	color: "inherit",
	textDecoration: "none",
	"&: hover": {
		textDecoration: "none",
	},
}));
