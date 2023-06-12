import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Tabs, Tab, Box } from "@mui/material";

import { setIsAuth } from "../../store/reducers/authSlice";
// eslint-disable-next-line import/named
import { clearFavorites } from "../../store/reducers/favoriteSlice";
import { clearCart } from "../../store/reducers/cartSlice";
import "./Profile.scss";

import CategoryTitle from "../../components/CategoryTitle";
import EditProfile from "./ProfileMenuBlocks/EditProfile";
import PasswordChange from "./ProfileMenuBlocks/PasswordChange";
import OrdersHistory from "./ProfileMenuBlocks/OrdersHistory";
import TabPanel from "./components/TabPanel";
// eslint-disable-next-line import/named
import { a11yProps } from "./components/TabPanel/TabPanel";

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [value, setValue] = useState(1);

	const { profileMenu } = useParams();

	useEffect(() => {
		switch (profileMenu) {
			case "edit-profile":
				setValue(0);
				break;
			case "change-password":
				setValue(1);
				break;
			case "orders-history":
				setValue(2);
				break;
			default:
				setValue(1);
				break;
		}
	}, [profileMenu]);

	return (
		<Container>
			<CategoryTitle text="Особистий кабінет" />
			<Box
				display="flex"
				gap="60px"
				sx={{
					flexDirection: { xs: "column", sm: "row" },
				}}
			>
				<Box
					sx={{
						display: { xs: "none", md: "flex" },
					}}
				>
					<Grid
						item
						xs={4}
						sx={{
							flexGrow: 1,
							bgcolor: "background.paper",
						}}
					>
						<Tabs
							className="profile-tabs-box"
							orientation="vertical"
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
							aria-label="Vertical tabs example"
							variant="scrollable"
							scrollButtons="auto"
							sx={{
								backgroundColor: "#F5F5F5",
								width: "300px",
								height: "272px",
							}}
							//
						>
							<Tab
								className="profile-tabs"
								color="secondary"
								label="Редагувати профіль"
								component={Link}
								to="/profile/edit-profile"
								{...a11yProps(0)}
							/>
							<Tab
								className="profile-tabs"
								color="secondary"
								label="Змінити пароль"
								component={Link}
								to="/profile/change-password"
								{...a11yProps(1)}
							/>
							<Tab
								className="profile-tabs"
								color="secondary"
								label="Мої замовлення"
								component={Link}
								to="/profile/orders-history"
								{...a11yProps(2)}
							/>
							<Tab
								className="profile-tabs"
								color="secondary"
								onClick={() => {
									localStorage.removeItem("token");
									dispatch(setIsAuth(false));
									dispatch(clearFavorites());
									dispatch(clearCart());
									navigate("/");
								}}
								label="Вийти з кабінету"
							/>
						</Tabs>
					</Grid>
				</Box>
				<Box>
					<Grid item xs={8}>
						<TabPanel value={value} index={0}>
							<EditProfile />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<PasswordChange />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<OrdersHistory />
						</TabPanel>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Profile;
