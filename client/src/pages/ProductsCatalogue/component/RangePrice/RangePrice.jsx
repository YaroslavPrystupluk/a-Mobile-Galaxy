import React from "react";
import PropTypes from "prop-types";
import { Box, Slider } from "@mui/material";

function RangeSlider({ setPriceParams, minVal, maxVal, min, max }) {
	const handleChangeCommitted = (event, newValue, changeSearchParamsPrice = false) => {
		setPriceParams(newValue[0], newValue[1], changeSearchParamsPrice);
	};
	return (
		<Box sx={{ width: 250, margin: 0 }}>
			<Slider
				sx={{
					margin: 0,
					"& .css-14pt78w-MuiSlider-rail": { margin: 0 },
					"& .css-ouckof-MuiSlider-valueLabel": { backgroundColor: "#2e7d32", padding: "3px" },
					"& .MuiSlider-valueLabelLabel": {
						left: "calc(-50% + 4px)",
						padding: 0,
						margin: 0,
						color: "#ffffff",
					},
				}}
				color="secondary"
				getAriaLabel={() => "Ціна"}
				value={[minVal, maxVal]}
				onChange={(event, newValue) => handleChangeCommitted(event, newValue)}
				onChangeCommitted={(event, newValue) => handleChangeCommitted(event, newValue, true)}
				valueLabelDisplay="auto"
				min={min}
				max={max}
			/>
		</Box>
	);
}
RangeSlider.propTypes = {
	setPriceParams: PropTypes.func.isRequired,
};
export default RangeSlider;
