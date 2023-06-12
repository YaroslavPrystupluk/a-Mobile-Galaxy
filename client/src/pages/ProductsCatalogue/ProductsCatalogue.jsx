import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Typography, Box, Button } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../store/reducers/productsSlice";
import { selectSearch } from "../../store/selectors";
import AppPagination from "../../components/AppPagination";
import ToastNotification from "../../components/ToastNotification";
import { selectProductsQuantity } from "../../store/selectors/products.selectors";
import FiltersBlock from "./component/FiltersBlock/FiltersBlock";
import Spinner from "../../components/Spinner";
import NoItemsFoundMessage from "./component/NoItemsFoundMessage";
import useLocationParams from "./hooks";
import { CatalogueWrapper, FiltersPhonesStyledWrapper } from "./styled";
import { fetchSearchProducts } from "../../store/reducers/searchSlice";

const ProductsCatalogue = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const productsLoading = useSelector((state) => state.products.loader);
	const searchLoading = useSelector((state) => state.search.loader);
	const [products, setProducts] = useState([]);
	const [notification, setNotification] = useState(false);
	const [startPage, setStartPage] = useState(searchParams.get("startPage") || 1);
	const [filteredData, setFilteredData] = useState([]);
	const [filterBar, openFilterBar] = useState(false);
	const isMobileSize = useMediaQuery("(max-width:700px)");
	const perPage = 6;
	let noItems = true;
	const [prevParams, setPrevParams] = useState({ startPage: 1, perPage });
	const productsQuantity = useSelector(selectProductsQuantity);
	const searchProductsQuantity = useSelector((state) => state.search.matchedProductsQuantity);
	const dataFromSearch = useSelector(selectSearch);
	const [emptyArray, setEmptyArray] = useState(false);
	const { params } = useLocationParams({ startPage, perPage });
	const quantity = !searchParams.toString().includes("query")
		? productsQuantity
		: searchProductsQuantity;
	useEffect(() => {
		/* setPrevParams(params); */
		if (searchParams.toString().includes("query")) {
			dispatch(
				fetchSearchProducts({
					query: searchParams.get("query"),
					startPage: searchParams.get("startPage") || 1,
					perPage,
				}),
			);
		} else {
			dispatch(fetchProducts(params)).then((res) => {
				setProducts(res.payload.products);
				if (res.payload.products.length === 0) {
					setEmptyArray(true);
				} else {
					setEmptyArray(false);
				}
			});
		}
		setStartPage(parseInt(searchParams.get("startPage") ?? "1", 10));
	}, [startPage, params, filteredData, searchParams]);
	useEffect(() => {
		const minPrice = searchParams.get("minPrice");
		const maxPrice = searchParams.get("maxPrice");
		if (minPrice !== null && maxPrice !== null) {
			openFilterBar(true);
		} else {
			openFilterBar(false);
		}
		setPrevParams(params);
	}, [params, openFilterBar]);
	if (searchParams.get("query")) {
		noItems = !dataFromSearch.length && !searchLoading;
	} else {
		noItems = emptyArray;
	}
	return (
		<Container>
			{notification && <ToastNotification text="Товар успішно додано до кошика" />}
			{isMobileSize && (
				<Button
					color="secondary"
					variant="contained"
					sx={{
						width: "140px",
						height: "46px",
						margin: "20px",
					}}
					onClick={() => {
						openFilterBar((prev) => !prev);
					}}
				>
					Фільтри
				</Button>
			)}
			{dataFromSearch.length > 0 && (
				<Box
					pb={6}
					display="flex"
					alignItems="center"
					sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
				>
					<Typography
						sx={{ display: { xs: "none", sm: "flex" } }}
						variant="h5"
						fontWeight="fontWeightRegular"
						fontFamily="Open Sans, sans-serif"
						color="grey.main"
					>
						Результати пошуку
					</Typography>
				</Box>
			)}
			<FiltersPhonesStyledWrapper isMobileSize={isMobileSize}>
				{isMobileSize && filterBar && <FiltersBlock />}
				{!isMobileSize && <FiltersBlock />}
				<CatalogueWrapper>
					{(productsLoading || searchLoading) && <Spinner />}
					{!productsLoading && (
						<>
							{noItems && <NoItemsFoundMessage text="Товарів не знайдено" />}
							{/* eslint-disable-next-line no-nested-ternary */}
							{!searchParams.toString().includes("query")
								? products?.map((card, index) => (
										<ProductCard
											priceColor="#57646E"
											key={index}
											card={card}
											setNotification={setNotification}
										/>
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  ))
								: dataFromSearch?.map((card, index) => (
										<ProductCard
											priceColor="#57646E"
											key={index}
											card={card}
											setNotification={setNotification}
										/>
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  ))}
						</>
					)}
				</CatalogueWrapper>
			</FiltersPhonesStyledWrapper>
			<AppPagination
				pages={Math.ceil(quantity / perPage)}
				page={startPage}
				onPageChange={(e, page) => {
					setSearchParams((prev) => {
						setStartPage(() => page);
						prev.set("startPage", page);
						window.scroll(0, 0);
						return prev;
					});
				}}
			/>
		</Container>
	);
};
export default ProductsCatalogue;
