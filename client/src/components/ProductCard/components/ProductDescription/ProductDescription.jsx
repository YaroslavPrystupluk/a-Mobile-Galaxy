import React from "react";
import PropTypes from "prop-types";
import "./ProductDescription.scss";
import styled from "styled-components";

const ProductDescription = ({ name, color }) => {
	return (
		<>
			<Description>{name}</Description>
			<Description>{color}</Description>
		</>
	);
};
const Description = styled.p`
	margin: 0 auto 10px;
	font-family: Open Sans, sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 14px;
	color: #000000;
`;
ProductDescription.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};
export default ProductDescription;
