import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

export const a11yProps = (index) => {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tab-${index}`,
		tabIndex: -1,
	};
};
TabPanel.propTypes = {
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
export default TabPanel;
