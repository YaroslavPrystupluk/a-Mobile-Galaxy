import { Button, MenuItem } from "@mui/material";

export default function ButtonClean({ field }) {
	return (
		<Button
			onClick={field}
			variant="contained"
			color="secondary"
			sx={{
				position: "absolute",
				width: "20px",
				height: "20px",
				top: "16px",
				left: "77%",
				boxShadow: "none",
				padding: "12px",
				borderRadius: "50%",
				minWidth: "20px",
				backgroundColor: "#ffffff",
				color: "grey",
				zIndex: "900000",
				"&:hover": {
					backgroundColor: "#ffffff",
					boxShadow: "none",
				},
				fontSize: "20px",
			}}
		>
			&#215;
		</Button>
	);
}
