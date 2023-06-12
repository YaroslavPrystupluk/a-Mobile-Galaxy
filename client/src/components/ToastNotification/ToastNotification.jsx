import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ToastNotification = ({ text }) => {
	return (
		<ToastWrapper>
			<Message>{text}</Message>
		</ToastWrapper>
	);
};
const ToastWrapper = styled.div`
	box-sizing: border-box;
	background-color: #afdfc2;
	display: block;
	text-align: end;
	position: fixed;
	border-radius: 10px;
	margin: 0 auto 20px auto;
	padding: 15px;
	right: 2%;
	z-index: 5;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
`;
const Message = styled.p`
	font-family: Montserrat, sans-serif;
	font-weight: bold;
	font-size: 15px;
	color: black;
`;
ToastNotification.propTypes = {
	text: PropTypes.string.isRequired,
};
export default ToastNotification;
