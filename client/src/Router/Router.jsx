import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "../pages/Home";
import OneProduct from "../pages/OneProduct";
import About from "../pages/About";
import Guarantee from "../pages/Guarantee";
import PaymentAndDelivery from "../pages/PaymentAndDelivery";
import ExchangeAndReturn from "../pages/ExchangeAndReturn";
import ProductsCatalogue from "../pages/ProductsCatalogue/ProductsCatalogue";
import PlacingAnOrder from "../pages/PlacingAnOrder";
import Cart from "../pages/Cart/Cart";
import Contacts from "../pages/Contacts";
import NotFoundPage from "../pages/NotFoundPage";
import NotPage from "../pages/NotPage";
import FavoritePage from "../pages/FavoritePage";
import Profile from "../pages/Profile";
import PasswordChange from "../pages/Profile/ProfileMenuBlocks/PasswordChange/PasswordChange";
import EditProfile from "../pages/Profile/ProfileMenuBlocks/EditProfile/EditProfile";
import OrdersHistory from "../pages/Profile/ProfileMenuBlocks/OrdersHistory/OrdersHistory";
import { getLocalItem } from "../helpers/getLocalItem";
import { setIsAuth } from "../store/reducers/authSlice";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function RootRouters() {
	const dispatch = useDispatch();
	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		getLocalItem("token") ? dispatch(setIsAuth(true)) : dispatch(setIsAuth(false));
	}, []);
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/products/:id" element={<OneProduct />} />
			<Route path="/products" element={<ProductsCatalogue />} />
			<Route path="/orders" element={<PlacingAnOrder />} />
			<Route path="/about" element={<About />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/favorites" element={<FavoritePage />} />
			<Route path="/guarantee" element={<Guarantee />} />
			<Route path="/paymentAndDelivery" element={<PaymentAndDelivery />} />
			<Route path="/exchangeAndReturn" element={<ExchangeAndReturn />} />
			<Route path="/contacts" element={<Contacts />} />
			{/* <Route path="*" element={<NotPage />} /> */}
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			>
				<Route path=":profileMenu" element={<EditProfile />} />
				<Route path=":profileMenu" element={<PasswordChange />} />
				<Route path=":profileMenu" element={<OrdersHistory />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
export default RootRouters;
