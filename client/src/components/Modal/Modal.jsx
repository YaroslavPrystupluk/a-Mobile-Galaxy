import React, { useEffect, useMemo, createRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseCross } from "./configs/styled";
import styles from "./modal.module.scss";
import { setModal } from "../../store/reducers/modalSlice";

const modalRootElement = document.querySelector("#modal");

const Modal = ({ children, customWidth, status }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const orderNo = useSelector((state) => state.modal.orderNo);
	const { loading } = useSelector((state) => state.orders.meta);
	const actionModalHandler = (stat) => {
		dispatch(setModal(stat));
	};
	const element = useMemo(() => document.createElement("div"), []);
	const myRef = createRef();
	const outsideCloseHandler = (e) => {
		if (e.target.contains(myRef.current)) {
			actionModalHandler(null);
		}
	};
	useEffect(() => {
		if (status) {
			modalRootElement.appendChild(element);
			document.body.style.overflow = "hidden";
			return () => {
				modalRootElement.removeChild(element);
				document.body.style.overflow = "auto";
			};
		}
		return undefined;
	});

	if (status) {
		return createPortal(
			<div className={styles.overlay} onClick={outsideCloseHandler}>
				<div ref={myRef} className={styles.modal}>
					{children({
						order: orderNo,
						onNavigate: navigate,
						onStatusChange: actionModalHandler,
						loader: loading,
					})}
					<CloseCross
						className={styles.modal__btn}
						onClick={() => {
							actionModalHandler(null);
						}}
					>
						&#215;
					</CloseCross>
				</div>
			</div>,
			element,
		);
	}
	return null;
};
Modal.defaultProps = {
	customWidth: 40,
};
Modal.propTypes = {
	status: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired,
	customWidth: PropTypes.number,
};
export default Modal;
