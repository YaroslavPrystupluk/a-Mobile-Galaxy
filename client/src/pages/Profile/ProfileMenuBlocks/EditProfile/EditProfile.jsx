import React from "react";
import { Typography } from "@mui/material";
import UserInfoForm from "../../components/UserInfoForm";
import { EditProfileWrapper } from "./styled";

const EditProfile = () => {
	return (
		<EditProfileWrapper>
			<Typography
				fontWeight="fontWeightBold"
				sx={{ fontSize: "20px", color: "#000000", fontFamily: "Open Sans, sans-serif" }}
			>
				Профіль користувача
			</Typography>
			<UserInfoForm />
		</EditProfileWrapper>
	);
};

export default EditProfile;
