import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import "./Description.scss";

const Description = ({ props }) => {
	const {
		brand,
		diagonal,
		screenType,
		numberOfCores,
		size,
		RAM,
		iternalStorage,
		mainCamera,
		selfieCamera,
		battery,
		processor,
		waterResistant,
		simCards,
	} = props;
	return (
		<Box sx={{ width: "400px", marginTop: "20px" }}>
			<Grid
				className="popular-block"
				container
				rowSpacing={{ xs: 1, sm: 1, md: 3 }}
				columnSpacing={{ xs: 3, sm: 3, md: 1, lg: 4 }}
			>
				{" "}
				<Grid item xs={4}>
					<p>Бренд</p>
				</Grid>
				<Grid item xs={8}>
					<p>{brand}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Кількість ядер</p>
				</Grid>
				<Grid item xs={8}>
					<p>{numberOfCores}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Габарити:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{size}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Оперативна пам&#8217;ть:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{RAM}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Вбудована пам&#8217;ть:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{iternalStorage}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Батарея:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{battery}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Основна камера:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{mainCamera}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Фронтальна камера</p>
				</Grid>
				<Grid item xs={8}>
					<p>{selfieCamera}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Процесор</p>
				</Grid>
				<Grid item xs={8}>
					<p>{processor}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Тип екрану:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{screenType}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Кількість SIM-карт:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{simCards}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Діагональ:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{diagonal}</p>
				</Grid>
				<Grid item xs={4}>
					<p>Водонепроникний:</p>
				</Grid>
				<Grid item xs={8}>
					<p>{waterResistant}</p>
				</Grid>
			</Grid>
		</Box>
	);
};
Description.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	props: PropTypes.object.isRequired,
};
export default Description;
