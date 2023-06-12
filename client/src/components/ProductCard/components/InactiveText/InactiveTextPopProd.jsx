import React from "react";
import { Typography } from "@mui/material";

export const InactiveTextPopProd = () => {
	return (
		<Typography
			fontWeight="fontWeightRegular"
			sx={{
				position: "absolute",
				left: "50%",
				transform: "translate(-50%)",
				fontSize: "14px",
				textAlign: "center",
				top: "5px",
			}}
		>
			Немає в наявності
		</Typography>
	);
};
