import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import CategoryTitle from "../CategoryTitle";
import ProductCard from "../ProductCard";

import "./styles.scss";
import { swiperBreakpoints } from "./swiperBreakpoints/swiperBreakpoints";
import { fetchProducts } from "../../store/reducers/productsSlice";
import Spinner from "../Spinner";

const PopularProducts = ({ advertisement = false }) => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const productsLoading = useSelector((state) => state.products.loader);
	useEffect(() => {
		const params = new URLSearchParams();
		params.set("popular", "true");
		params.set("perPage", "5");
		dispatch(fetchProducts(params)).then((res) => {
			setProducts(res.payload.products);
		});
	}, []);
	return (
		<Container>
			{productsLoading && <Spinner />}
			{!productsLoading && (
				<>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						{!advertisement && <CategoryTitle text="Популярні товари" />}
						{advertisement && <CategoryTitle text="Акційний товар" />}
						{!advertisement && (
							<Link
								style={{ textDecoration: "none" }}
								to="/products"
								onClick={() => window.scroll(0, 0)}
							>
								<Button color="secondary" variant="contained">
									Усі товари
								</Button>
							</Link>
						)}
					</Box>

					<Swiper
						spaceBetween={50}
						navigation={true}
						pagination={{
							clickable: true,
						}}
						modules={[Navigation, Pagination]}
						className="productsSwiper"
						breakpoints={swiperBreakpoints}
					>
						{products?.map((card, index) => {
							if (!advertisement) {
								return (
									card.popular && (
										<SwiperSlide key={index} className="popularProducts-swiperSlide">
											<ProductCard key={index} card={card} withCart={false} />
										</SwiperSlide>
									)
								);
							}
							return (
								card.sale && (
									<SwiperSlide key={index} className="popularProducts-swiperSlide">
										<ProductCard key={index} card={card} withCart={false} />
									</SwiperSlide>
								)
							);
						})}
					</Swiper>
				</>
			)}
		</Container>
	);
};
PopularProducts.defaultProps = {
	advertisement: false,
};
PopularProducts.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	advertisement: PropTypes.bool,
};
export default PopularProducts;
