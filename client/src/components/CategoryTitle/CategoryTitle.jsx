import React from "react";
import PropTypes from "prop-types";
import "./CategoryTitle.scss";

const CategoryTitle = ({ text }) => {
	return (
		<div className="category__title__wrapper">
			<h2 className="category__title">{text}</h2>
		</div>
	);
};

CategoryTitle.propTypes = {
	text: PropTypes.string.isRequired,
};

export default CategoryTitle;
