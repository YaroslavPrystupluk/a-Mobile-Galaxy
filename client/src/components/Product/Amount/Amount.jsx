import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
	addOneProductAuth,
	addQuantityToShoppingCart,
	decreaseAmountAuth,
} from "../../../store/reducers/cartSlice";
import "./Amount.scss";

export default function Amount({ amount, itemNo, quantityAuth }) {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);
	const increment = () => {
		if (!isAuth) {
			dispatch(addQuantityToShoppingCart({ itemNo, addToQty: 1 }));
		} else {
			dispatch(addOneProductAuth(itemNo));
		}
	};

	const decrement = () => {
		if (amount === 1) return;
		if (!isAuth) {
			dispatch(addQuantityToShoppingCart({ itemNo, addToQty: -1 }));
		} else {
			dispatch(decreaseAmountAuth(itemNo));
		}
	};

	return (
		<div className="inpt">
			<button type="button" className="inpt__button" onClick={decrement}>
				-
			</button>
			<p className="inpt__text">{!isAuth ? amount : quantityAuth}</p>
			<button type="button" className="inpt__button" onClick={increment}>
				+
			</button>
		</div>
	);
}
Amount.propTypes = {
	itemNo: PropTypes.string.isRequired,
};
