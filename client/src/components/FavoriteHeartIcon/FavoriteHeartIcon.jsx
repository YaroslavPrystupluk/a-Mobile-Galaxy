import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorite } from "../../store/selectors";
import {
	removeItemFavorite,
	setFavorite,
	addToFavorites,
	deleteFromFavorites,
} from "../../store/reducers/favoriteSlice";

const FavoriteHeartIcon = ({ id }) => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const [liked, setLiked] = useState(false);
	const favorites = useSelector(selectFavorite);
	const authFav = useSelector((state) => state.favorite.favoritesAuth);
	const authLikeUpdateHandler = () => {
		if (liked) {
			dispatch(deleteFromFavorites(id));
			setLiked((prevState) => !prevState);
		} else {
			dispatch(addToFavorites(id));
			setLiked((prevState) => !prevState);
		}
	};

	const likeUpdateHandler = () => {
		if (liked) {
			dispatch(removeItemFavorite(id));
			setLiked((prevState) => !prevState);
		} else {
			dispatch(setFavorite(id));
			setLiked((prevState) => !prevState);
		}
	};
	useEffect(() => {
		if (isAuth) {
			setLiked(authFav?.some(({ _id: elId }) => elId === id));
		} else {
			setLiked(favorites?.some((el) => el === id));
		}
	}, [isAuth]);
	return (
		<FavoriteIcon
			onClick={() => {
				// eslint-disable-next-line no-unused-expressions
				isAuth ? authLikeUpdateHandler() : likeUpdateHandler();
			}}
			color={liked ? "error" : "mediumgrey"}
			sx={{
				position: "absolute",
				cursor: "pointer",
				fontSize: "32px",
				top: "3px",
			}}
		/>
	);
};
FavoriteIcon.propTypes = {
	id: PropTypes.string,
};
export default FavoriteHeartIcon;
