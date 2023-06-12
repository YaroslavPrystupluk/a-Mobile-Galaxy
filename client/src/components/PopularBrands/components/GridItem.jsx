import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import "../PopularBrands.scss";
import { selectorArrFilters } from "../../../store/selectors";
import { actionFetchFilters } from "../../../store/reducers/filtersSlice";
import { paragraph, heading, button } from "../styled";

const GridItem = () => {
	const dispatch = useDispatch();
	const filters = useSelector(selectorArrFilters);
	useEffect(() => {
		const abort = new AbortController();
		dispatch(actionFetchFilters(abort.signal, "", "brand"));
		return () => {
			abort.abort();
		};
	}, []);

	const blockBrand =
		Array.isArray(filters) &&
		filters.map(({ name, description }, index) => {
			const params = new URLSearchParams();
			params.set("brand", name);
			return (
				<Grid item xs={12} sm={12} md={6} key={index}>
					<div className={`popular popular--${name}`}>
						<div className="popular--overlay" />
						<div className="popular--text">
							<Stack spacing={4} sx={{ width: "50%" }}>
								<Stack spacing={1}>
									<Typography
										variant="h4"
										fontWeight="fontWeightBold"
										sx={heading}
										className="typography"
										gutterBottom
									>
										{name}
									</Typography>
									<Typography
										variant="h5"
										fontWeight="fontWeightMedium"
										sx={paragraph}
										className="typography--p"
									>
										{description}
									</Typography>
								</Stack>
								<Link
									to={`/products?${params.toString()}`}
									onClick={() => window.scroll(0, 0)}
									className="link"
								>
									<Button color="primary" variant="contained" sx={button}>
										Детальніше
									</Button>
								</Link>
							</Stack>
						</div>
					</div>
				</Grid>
			);
		});

	return <>{blockBrand}</>;
};

export default GridItem;
