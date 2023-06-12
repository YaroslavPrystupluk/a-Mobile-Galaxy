import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const LogoIcon = () => {
	const navigate = useNavigate();
	return (
		<Box
			component="img"
			src="https://res.cloudinary.com/dsx708og4/image/upload/v1679135318/logo_b11xcve_zsxftk.png"
			alt="logo"
			align="center"
			sx={{
				pb: "10px",
				maxWidth: { xs: "100px", sm: "150px" },
				cursor: "pointer",
			}}
			onClick={() => {
				navigate("/");
			}}
		/>
	);
};
export default LogoIcon;
