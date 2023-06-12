import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

import { Container, Box, Button, Typography } from "@mui/material";

import { lightSlideTitle, darkSlideTitle } from "./sxMuiComponents/slideTitle";
import { lightSlideDescription, darkSlideDescription } from "./sxMuiComponents/slideDescription";
import { darkBackButton } from "./sxMuiComponents/slideButton";

import { fetchSlides } from "../../store/reducers/slidesSlice";
import { selectSlidesData } from "../../store/selectors";

const Slider = React.memo(() => {
	const dispatch = useDispatch();
	const slides = useSelector(selectSlidesData);
	useEffect(() => {
		dispatch(fetchSlides());
	}, []);

	SwiperCore.use([Autoplay]);

	return (
		<Container>
			<Swiper
				slidesPerView={1}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				navigation={true}
				speed={800}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Pagination]}
				className="slider"
			>
				{slides?.map(({ _id, imageUrl, title, description, dark, brandPageLink }) => {
					return (
						<SwiperSlide key={_id} className="swiper-item">
							<img
								className="swiper-slide-img"
								style={{ width: "100%", height: "100%" }}
								src={imageUrl}
							/>
							<Box component="div" className="slide-content">
								<Typography
									variant="h3"
									fontWeight="fontWeightBold"
									sx={dark ? lightSlideTitle : darkSlideTitle}
									className="slide-content-title"
								>
									{title}
								</Typography>

								<Typography
									sx={dark ? lightSlideDescription : darkSlideDescription}
									className="slide-content-descr"
								>
									{description}
								</Typography>

								<Button
									color="primary"
									variant="contained"
									sx={darkBackButton}
									component={Link}
									to={brandPageLink}
									className="slide-content-button"
								>
									Детальніше
								</Button>
							</Box>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Container>
	);
});

export default Slider;
