import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const OrderPrice = ({ total }) => {
	return (
		<div
			style={{
				marginTop: "30px",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-between",
				alignItems: "flex-end",
			}}
		>
			<Typography
				sx={{ fontSize: "24px", marginRight: "5px" }}
				fontWeight="fontWeightBold"
				color="secondary"
			>
				Сума замовлення
			</Typography>

			<Typography sx={{ fontSize: "32px" }} fontWeight="fontWeightBold" color="secondary">
				{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн
			</Typography>
		</div>
	);
};
OrderPrice.propTypes = {
	total: PropTypes.number.isRequired,
};
export default OrderPrice;
