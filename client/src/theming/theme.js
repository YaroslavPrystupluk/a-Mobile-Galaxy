import { createTheme, colors } from "@mui/material";
import React from "react";

const theme = createTheme({
	components: {
		Button: {
			styleOverrides: {
				root: {
					padding: "25px 35px",
					fontWeight: 700,
					fontFamily: "Open Sans, sans-serif",
					textTransform: "uppercase",
					fontSize: "1 rem",
					borderRadius: "3px",
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#FFFFFF",
			contrastText: "#007042",
		},
		secondary: {
			main: colors.green[800],
		},
		grey: { main: "#57646E" },
		lightgrey: { main: "#D3D7DA" },
		mediumgrey: { main: "#A0A9AF" },
		darkgrey: { main: "rgba(33, 39, 40, 0.6)" },

		graphite: { main: "#2E3438" },
		black: { main: "#000000" },
		warning: {
			main: colors.orange[400],
		},
		lime: { main: colors.lime[800] },
	},
	error: { main: colors.red[700] },
	typography: {
		fontFamily: "Open Sans, Montserrat, sans-serif",
		fontWeightBold: 700,
		fontWeightRegular: 400,
		fontWeightMedium: 600,
		fontWeightLight: 300,
	},
});

export default theme;
