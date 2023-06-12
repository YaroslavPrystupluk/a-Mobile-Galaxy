import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { actionFetchProduct } from "../../store/reducers/oneProductSlice";
import { selectorPageObj } from "../../store/selectors";
import Spinner from "../../components/Spinner";
import PopularProducts from "../../components/PopularProducts";
import "./OneProduct.scss";
import ToastNotification from "../../components/ToastNotification";

function OneProduct() {
	// request finish, we can render
	// undefined - not send request
	// false - sended
	// true - request geting
	const [canRender, setCanRender] = useState(undefined);
	const [notification, setNotification] = useState(false);
	const { id } = useParams();
	const data = useSelector(selectorPageObj);
	const stateLoad = useSelector((state) => {
		return state.oneProduct.loading;
	});
	const dispatch = useDispatch();
	useEffect(() => {
		setCanRender(() => false);
		dispatch(actionFetchProduct(id));
	}, [id]);

	useEffect(() => {
		if (!stateLoad && canRender === false) {
			setCanRender(() => true);
		}
	}, [stateLoad]);
	return (
		<>
			{!canRender && <Spinner />}
			{canRender && (
				<div>
					{notification && <ToastNotification text="Товар успішно додано до кошика" />}
					<Product props={data} setNotification={setNotification} />
					<PopularProducts advertisement={true} />
				</div>
			)}
		</>
	);
}

export default OneProduct;
