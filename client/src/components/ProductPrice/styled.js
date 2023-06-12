import styled from "styled-components";

export const PriceWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 7px 0 10px 0;
`;
export const CurrentPrice = styled.span`
	font-family: Montserrat, sans-serif;
	font-weight: 900;
	font-size: 23px;
	line-height: 29px;
	color: ${(props) => {
		if (props.previousPrice) return "#E03737";
		if (props.priceColor) return props.priceColor;
		return "#007042";
	}}
	};
	&:after {
		content: " грн";
	}

@media (max-width: 768px) {
	font-size: 16px;
	line-height: 24px;
	padding-bottom: 8px;
}

@media (max-width: 480px) {
	font-size: 16px;
	line-height: 20px;
}
`;
export const PreviousPrice = styled.span`
	font-family: Montserrat, sans-serif;
	font-weight: 900;
	font-size: 18px;
	line-height: 23px;
	color: #57646e;
	text-decoration: line-through;
	&:after {
		content: " грн";
	}
	@media (max-width: 768px) {
		font-size: 15px;
		line-height: 24px;
	}

	@media (max-width: 480px) {
		font-size: 13px;
		line-height: 20px;
	}
`;
