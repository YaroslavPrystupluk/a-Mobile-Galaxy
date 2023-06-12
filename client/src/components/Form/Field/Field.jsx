import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, InputLabel, TextField } from "@mui/material";
import { inputLabel } from "../../../pages/PlacingAnOrder/sxStyles/inputLabel";

const Field = ({ description, name, type, onChange, value, errors }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
			<InputLabel className="textField-label" sx={inputLabel}>
				{description}
			</InputLabel>
			<TextField
				fullWidth
				color="secondary"
				variant="outlined"
				id={name}
				name={name}
				type={type}
				placeholder={description}
				onChange={onChange}
				value={value}
				min={type === "number" ? "15" : null}
			/>
			{errors && <Error>{errors}</Error>}
		</Box>
	);
};
export const Error = styled.p`
	font-family: Open Sans, sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 14px;
	color: #e03737;
	&:before {
		content: "\\26A0";
		display: inline-block;
		font-size: 16px;
		margin-right: 4px;
	}
`;
export default Field;
