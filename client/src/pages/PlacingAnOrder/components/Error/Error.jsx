import styled from "styled-components";

export const Error = styled.p`
	font-family: Open Sans, sans-serif;
	font-size: 14px;
	font-weight: 400;
	line-height: 14px;
	color: #e03737;
	&:before {
		content: "\\26A0";
		display: inline-block;
		font-size: 16px;
		margin-right: 4px;
	}
`;
