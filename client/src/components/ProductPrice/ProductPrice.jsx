import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/named
import { PriceWrapper, CurrentPrice, PreviousPrice } from "./styled";

const ProductPrice = ({ currentPrice, previousPrice = "", priceColor }) => {
	return (
		<PriceWrapper>
			<CurrentPrice priceColor={priceColor} previousPrice={previousPrice}>
				{currentPrice}
			</CurrentPrice>
			{previousPrice && <PreviousPrice>{previousPrice}</PreviousPrice>}
		</PriceWrapper>
	);
};
ProductPrice.defaultProps = {
	previousPrice: "",
	priceColor: undefined,
	currentPrice: "",
};
ProductPrice.propTypes = {
	currentPrice: PropTypes.number,
	// eslint-disable-next-line react/forbid-prop-types
	previousPrice: PropTypes.any,
	priceColor: PropTypes.string,
};
export default ProductPrice;
