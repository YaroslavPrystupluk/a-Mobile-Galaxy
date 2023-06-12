import React from "react";
import { Typography } from "@mui/material";

const NoItemsFoundMessage = ({ text = "Товарів немає" }) => {
	return (
		<Typography
			variant="h4"
			sx={{ textAlign: "center", fontSize: "30px", padding: "100px", fontWeight: "bold" }}
		>
			{text}
		</Typography>
	);
};

export default NoItemsFoundMessage;
