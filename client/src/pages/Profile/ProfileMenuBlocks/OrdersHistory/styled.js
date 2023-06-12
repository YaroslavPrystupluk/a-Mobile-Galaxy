import { styled } from "@mui/material/styles";
import { Box, TableRow } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: "#D3D7DA",
	},
}));
export const StyledBox = styled(Box)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: "#D3D7DA",
	},
}));
