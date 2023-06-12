import React from "react";
import { Typography } from "@mui/material";

export const InactiveTextCataloge = () => {
	return (
		<Typography
			fontWeight="fontWeightRegular"
			sx={{
				fontSize: "18px",
				textAlign: "center",
				paddingBottom: "10px",
			}}
		>
			Немає в наявності
		</Typography>
	);
};
