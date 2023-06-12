import styled from "styled-components";

export const ProductCardWrapper = styled.div`
	background-color: rgba(245, 245, 245, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 14px;
	position: relative;
	width: 100%;
	height: 95%;
	max-width: 300px;
	max-height: 510px;
	transition: all 0.3s ease-in;
	@media screen and (max-width: 700px) {
		width: 90%;
		margin-inline: auto;
	}
	@media screen and (min-width: 920px) {
		&:hover {
			transform: scale(1.1);
			box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.4);
			border-color: #007042;
		}
	}
	@media screen and (max-width: 350px) {
		margin-inline: auto;
		width: 285px;
	}
`;
export const Inactive = styled.div`
	* {
		&:before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(255, 255, 255, 0.1);
		}
	}
`;
