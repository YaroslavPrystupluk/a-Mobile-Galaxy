import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import useLocationParams from "../../hooks";
import Selection from "../Select";
import RangePrice from "../RangePrice";
import { selectorArrFilters } from "../../../../store/selectors";
import { actionFetchFilters, clearFilters } from "../../../../store/reducers/filtersSlice";
import { arrayField, arrayNameLabel, FilterWrapper } from "./helper";
import PointPrices from "./PointPrices/PointPrices";
import SortBox from "../SortBox";

const FiltersBlock = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { params } = useLocationParams();
	const filters = useSelector(selectorArrFilters);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const [upDateFilt, setUpDateFilt] = useState("");
	const priceHandler = (min, max, changeSearchParamsPrice = false) => {
		searchParams.get("minPrice");
		setMinPrice(min);
		setMaxPrice(max);
		if (changeSearchParamsPrice) {
			setSearchParams((prev) => {
				prev.set("minPrice", min);
				return prev;
			});
			searchParams.get("maxPrice");
			setSearchParams((prev) => {
				prev.set("maxPrice", max);
				return prev;
			});
		}
	};
	useEffect(() => {
		if (!minPrice) {
			setMinPrice(() => filters.minPrice);
		}
		if (!maxPrice) {
			setMaxPrice(() => filters.maxPrice);
		}
		if (!Array.isArray(filters) && !Object.keys(filters).length) {
			dispatch(clearFilters());
			navigate("/404");
		}
	}, [filters]);

	useEffect(() => {
		setMinPrice(() => 0);
		setMaxPrice(() => 0);
		const abort = new AbortController();
		dispatch(actionFetchFilters(abort.signal, searchParams));
		return () => {
			abort.abort();
		};
	}, [upDateFilt]);

	useEffect(() => {
		if (searchParams.get("query")) {
			setUpDateFilt("clear");
		}
	}, [searchParams]);

	const clearFiltersHandler = () => {
		setUpDateFilt("clearAll");
		searchParams.delete("brand");
		searchParams.delete("processor");
		searchParams.delete("diagonal");
		searchParams.delete("iternalStorage");
		searchParams.delete("RAM");
		searchParams.delete("waterResistant");
		searchParams.delete("minPrice");
		searchParams.delete("maxPrice");
	};
	const clearFiltersField = (field) => {
		if (searchParams.toString().includes(field)) {
			setUpDateFilt(`clear${field}`);
			setSearchParams((prev) => {
				prev.delete("startPage");
				prev.delete(field);
				return prev;
			});
		}
	};
	return (
		<FilterWrapper>
			<Stack spacing={2} sx={{ position: "sticky", top: "30px" }}>
				<Typography component="legend" sx={{ textAlign: "left", color: "grey", padding: 0 }}>
					Діапазон ціни, грн
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<PointPrices minPrice={minPrice} maxPrice={maxPrice} />
				</Box>
				<RangePrice
					setPriceParams={priceHandler}
					minVal={minPrice}
					maxVal={maxPrice}
					min={filters?.minPrice ?? 0}
					max={filters?.maxPrice ?? 0}
					sx={{ "text-align": "center" }}
				/>
				<Typography component="legend" sx={{ textAlign: "left", color: "grey" }}>
					Фільтри
				</Typography>
				<SortBox
					value={searchParams.get("sort")}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("sort", value);
							return prev;
						});
					}}
				/>
				{arrayField.map((el, ind) => (
					<Selection
						value={searchParams.get(el)}
						key={ind}
						setCurrentValue={(value) => {
							setMinPrice(() => 0);
							setMaxPrice(() => 0);
							setUpDateFilt(el);
							setSearchParams((prev) => {
								prev.set(el, value);
								prev.delete("query");
								prev.delete("minPrice");
								prev.delete("maxPrice");
								prev.delete("startPage");
								return prev;
							});
						}}
						nameLabel={arrayNameLabel[ind]}
						arrayProps={filters[el] ? filters[el] : []}
						clearFiltersField={() => clearFiltersField(el)}
					/>
				))}
				<Button
					onClick={() => {
						clearFiltersHandler();
						navigate("/products");
					}}
					variant="contained"
					color="secondary"
					sx={{
						width: "245px",
						height: "46px",
					}}
				>
					Очистити всі фільтри
				</Button>
			</Stack>
		</FilterWrapper>
	);
};
export default FiltersBlock;
