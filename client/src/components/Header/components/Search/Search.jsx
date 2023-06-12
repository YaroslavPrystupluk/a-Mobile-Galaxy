import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { fetchSearchProducts, clearSearch } from "../../../../store/reducers/searchSlice";
import useLocationParams from "../../../../pages/ProductsCatalogue/hooks/useLocationParams";

const Search = React.memo(() => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [input, setInput] = useState(searchParams.get("query") ?? "");
	const { params } = useLocationParams({ query: input });
	const handleClearSearch = () => {
		dispatch(clearSearch());
		setSearchParams((prev) => {
			prev.delete("query");
			return prev;
		});
		setInput("");
	};

	useEffect(() => {
		setInput(searchParams.get("query") ?? "");
	}, [searchParams]);

	return (
		<Box
			onSubmit={(e) => e.preventDefault()}
			component="form"
			sx={{
				"& .MuiTextField-root": {
					width: { xs: "280px", sm: "270px", md: "420px" },
				},

				position: "relative",
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				sx={{
					"& .MuiInputBase-root": {
						backgroundColor: { xs: "#ffffff", md: "transparent" },
						outline: "none",
						"&:hover": { border: "#007042" },
					},
					"& .MuiInputBase-input": {
						p: "16px 100px 16px 14px",
						border: "5px",
					},
				}}
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				color="secondary"
				id="outlined-search"
				label="Пошук..."
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment
							position="end"
							sx={{
								"& .MuiIconButton-edgeEnd": {
									position: "absolute",
									right: "85px",
								},
							}}
						>
							{input && (
								<IconButton
									edge="end"
									onClick={() => {
										handleClearSearch();
									}}
								>
									<ClearIcon color="secondary" />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
			/>
			<Button
				onClick={() => {
					if (input.length <= 1) return;
					setSearchParams((prev) => {
						const keys = [];
						prev.forEach((val, key) => {
							keys.push(key);
						});
						keys.forEach((key) => prev.delete(key));
						prev.set("query", input);
						return prev;
					});
					navigate(`/products?${searchParams.toString()}`);
				}}
				sx={{
					position: "absolute",
					top: "2px",
					right: "2px",
					height: "51px",
					backgroundColor: "#A0A9AF",
					borderRadius: "0 2px 2px 0",
					"&:hover": { backgroundColor: "#007042" },
				}}
			>
				<SearchIcon
					color="grey"
					sx={{
						fontSize: "44px",
						color: "#ffffff",
					}}
				/>
			</Button>
		</Box>
	);
});

export default Search;
