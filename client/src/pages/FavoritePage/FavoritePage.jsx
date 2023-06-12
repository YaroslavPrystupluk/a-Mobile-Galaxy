import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import { fetchProducts } from "../../store/reducers/productsSlice";
import OrderItem from "../../components/OrderItem";
import { getLocalItem } from "../../helpers/getLocalItem";
import useItemsToRender from "../Cart/hooks";
import ToastNotification from "../../components/ToastNotification";
import Spinner from "../../components/Spinner";
import NoItemsFoundMessage from "../ProductsCatalogue/component/NoItemsFoundMessage";
import CategoryTitle from "../../components/CategoryTitle";

const FavoritePage = () => {
	const dispatch = useDispatch();
	const [notification, setNotification] = useState(false);
	const isAuth = useSelector((state) => state.auth.isAuth);
	const [products, setProducts] = useState([]);
	const parsed = JSON.parse(getLocalItem("favorites") || "[]");
	const favorites = useSelector((state) => state.favorite.favorite);
	const authFav = useSelector((state) => state.favorite.favoritesAuth);
	const { loading } = useSelector((state) => state.favorite.meta);
	const unauthLoaded = useSelector((state) => state.products.loader);
	useEffect(() => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const params = useItemsToRender(parsed, setProducts);
		if (params === "_id=") return;
		dispatch(fetchProducts(params)).then((res) => {
			setProducts(res.payload.products);
		});
	}, [favorites]);
	const prodsToRender = isAuth
		? authFav?.map((item) => {
				return (
					<OrderItem
						setNotification={setNotification}
						key={item.itemNo}
						item={item}
						deleteCross={true}
					/>
				);
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  })
		: products?.map((item) => {
				return (
					<OrderItem
						setNotification={setNotification}
						key={item.itemNo}
						item={item}
						deleteCross={true}
					/>
				);
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  });
	if (isAuth && loading) return <Spinner />;
	if (!isAuth && unauthLoaded) return <Spinner />;
	return (
		<Container>
			{notification && <ToastNotification text="Товар успішно переміщено до кошика" />}
			<div className="cart-products">
				<CategoryTitle text="Улюблене" />
				<>
					<Box component="div" className="scroll">
						{prodsToRender}
					</Box>
				</>
				{!favorites.length && !authFav.length && <NoItemsFoundMessage />}
			</div>
		</Container>
	);
};
export default FavoritePage;
