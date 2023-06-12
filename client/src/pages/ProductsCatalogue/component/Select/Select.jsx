import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import ButtonClean from "./components/ButtonClean";

export default function Selection({
	arrayProps,
	setCurrentValue,
	nameLabel,
	value,
	clearFiltersField,
}) {
	const colorsTag = arrayProps.map((el) => (
		<MenuItem key={el} value={el} sx={{ width: "200px" }}>
			{el}
		</MenuItem>
	));
	const handleChange = (event) => {
		setCurrentValue(event.target.value);
	};
	return (
		<div>
			<FormControl sx={{ position: "relative", width: "250px" }}>
				<ButtonClean field={clearFiltersField} />
				<InputLabel color="secondary" id="demo-simple-select-autowidth-label">
					{nameLabel}
				</InputLabel>
				<Select
					labelId="demo-simple-select-autowidth-label"
					id="demo-simple-select-autowidth"
					value={!value ? "" : value}
					autoWidth
					label={nameLabel}
					color="secondary"
					onChange={handleChange}
				>
					{colorsTag}
				</Select>
			</FormControl>
		</div>
	);
}
Selection.defaultProps = {
	value: null,
};
Selection.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	arrayProps: PropTypes.array.isRequired,
	setCurrentValue: PropTypes.func.isRequired,
	nameLabel: PropTypes.string.isRequired,
	value: PropTypes.string,
};
