import React from "react";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import PropTypes from "prop-types";

const AppPagination = ({ pages, onPageChange, page }) => {
	return (
		<PaginationWrapper>
			<Pagination
				count={pages}
				page={page}
				variant="outlined"
				shape="rounded"
				color="secondary"
				onChange={onPageChange}
			/>
		</PaginationWrapper>
	);
};
const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 50px 0 50px 0;
`;
AppPagination.propTypes = {
	pages: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
};

export default AppPagination;
