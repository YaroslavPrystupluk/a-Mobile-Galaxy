import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductImageBox.scss";

const ProductImageBox = ({ image, brand, id }) => {
	return (
		<Link
			style={{ textDecoration: "none", position: "relative" }}
			className="logo__box"
			to={`/products/${id}`}
		>
			<img className="logo" src={image} alt={brand} />
		</Link>
	);
};
ProductImageBox.propTypes = {
	image: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
export default ProductImageBox;
