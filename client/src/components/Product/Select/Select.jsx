import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";

export default function Selection({ arrayProps, setCurrentColor, valueColor, nameLabel }) {
	const [color, setColor] = React.useState("");
	const colorsTag = arrayProps?.map((el) => (
		<MenuItem key={el} value={el} sx={{ width: "200px" }}>
			{el}
		</MenuItem>
	));
	const handleChange = (event) => {
		setColor(event.target.value);
		setCurrentColor(event.target.value);
	};
	return (
		<div>
			<FormControl sx={{ width: "200px" }}>
				<InputLabel color="secondary" id="demo-simple-select-autowidth-label">
					{nameLabel}
				</InputLabel>
				<Select
					labelId="demo-simple-select-autowidth-label"
					id="demo-simple-select-autowidth"
					value={valueColor}
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
Selection.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	arrayProps: PropTypes.array.isRequired,
	setCurrentColor: PropTypes.func.isRequired,
	valueColor: PropTypes.string.isRequired,
	nameLabel: PropTypes.string.isRequired,
};
