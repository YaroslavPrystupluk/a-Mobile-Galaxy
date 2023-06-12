import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ setCurrentValue, value }) {
	const handleChange = (event) => {
		setCurrentValue(event.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel color="secondary" id="demo-simple-select-label">
				Сортування
			</InputLabel>
			<Select
				fullWidth
				color="secondary"
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				autoWidth
				value={!value ? "" : value}
				label="Сортування"
				onChange={handleChange}
			>
				<MenuItem value="currentPrice">від найменшої ціни</MenuItem>
				<MenuItem value="-currentPrice">від найбільшої ціни</MenuItem>
			</Select>
		</FormControl>
	);
}
BasicSelect.defaultProps = {
	value: null,
};
BasicSelect.propTypes = {
	setCurrentValue: PropTypes.func.isRequired,
	value: PropTypes.string,
};
