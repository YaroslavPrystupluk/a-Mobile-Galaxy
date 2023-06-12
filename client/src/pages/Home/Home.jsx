import React from "react";
import Slider from "../../components/Slider/Slider";
import PopularProducts from "../../components/PopularProducts";
import PopularBrands from "../../components/PopularBrands";

const Home = () => {
	return (
		<div>
			<Slider />
			<PopularProducts />
			<PopularBrands />
		</div>
	);
};

export default Home;
