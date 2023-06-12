import styled from "styled-components";

export const CatalogueWrapper = styled.div`
	position: relative;
	display: grid;
	gap: 48px;
	grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
`;
export const FiltersPhonesStyledWrapper = styled.div`
	text-align: center;
	display: grid;
	grid-template-columns: ${(props) => (props.isMobileSize ? "auto" : "300px auto")};
`;
