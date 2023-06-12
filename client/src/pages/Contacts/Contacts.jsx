import React from "react";
import { Typography, Container } from "@mui/material";

const Contacts = () => {
	return (
		<Container align="center">
			<Typography p={3} align="center" variant="h5">
				Адреса
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="center"
			>
				Україна,
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="center"
			>
				м.Київ
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="center"
			>
				вул.Козаків 20
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="center"
			>
				info@mobilegalaxy.com.ua
			</Typography>
		</Container>
	);
};

export default Contacts;
