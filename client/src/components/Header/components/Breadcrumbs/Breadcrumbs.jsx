import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { data } from "./helper/helperBreadcrump";

const Breadcrumb = React.memo(() => {
	const breadcrumbs = useBreadcrumbs(data);

	const links = breadcrumbs.map(({ breadcrumb, match }, index) => (
		<span key={match.pathname}>
			<Link
				underline="hover"
				color="grey.main"
				key={match.pathname}
				component={NavLink}
				to={match.pathname}
			>
				{breadcrumb}
			</Link>
			{index < breadcrumbs.length - 1}
		</span>
	));
	return (
		<Breadcrumbs
			mb={2}
			aria-label="breadcrumb"
			sx={{ p: "15px 0", display: { xs: "none", sm: "block" } }}
		>
			{links}
		</Breadcrumbs>
	);
});

export default Breadcrumb;
