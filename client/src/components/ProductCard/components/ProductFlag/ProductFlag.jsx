import React from "react";
import PropTypes from "prop-types";
import "./ProductFlag.scss";

const ProductFlag = ({ sale }) => {
	return (
		<div className={`ribbon ribbon-top-right ${sale ? "red" : "orange"}`}>
			<span>{sale ? "sale" : "new item"}</span>
		</div>
	);
};
ProductFlag.defaultProps = {
	sale: false,
};
ProductFlag.propTypes = {
	sale: PropTypes.bool,
};
export default ProductFlag;
