import { Button, Typography } from "@mui/material";
import Modal from "../Modal";
import PageForm from "../../Form/Form";
import Spinner from "../../Spinner";
// eslint-disable-next-line import/named
import { ModalContainer, LoadingContainer } from "./styled";

export const modals = {
	SUCCESS: (
		<Modal status="SUCCESS">
			{({ order, onStatusChange, onNavigate, loader }) => {
				if (loader) {
					return (
						<LoadingContainer>
							<Spinner />
						</LoadingContainer>
					);
				}
				return (
					<>
						<ModalContainer>
							<Typography
								variant="h5"
								color="secondary"
								sx={{
									fontWeight: "600",
									fontSize: "18px",
									lineHeight: "180%",
									margin: "0 32px",
								}}
							>
								Дякуємо, що вибрали нас!
							</Typography>
							<Typography
								component="p"
								sx={{ fontSize: "16px", lineHeight: " 180%", marginBottom: "20px" }}
							>
								Ваше замовлення № {order} успішно оформлене. Чекайте на дзвінок від нашого фахівця.
							</Typography>
							<Button
								color="secondary"
								variant="contained"
								sx={{
									padding: "8px 8px",
								}}
								onClick={() => {
									onNavigate("/products");
									onStatusChange(null);
								}}
							>
								продовжити покупки
							</Button>
						</ModalContainer>
					</>
				);
			}}
		</Modal>
	),
	LOGIN: (
		<Modal status="LOGIN">
			{({ onStatusChange }) => {
				return (
					<>
						<PageForm
							status="LOGIN"
							onClose={() => {
								onStatusChange(null);
							}}
							onRegisterToggle={() => {
								onStatusChange("REGISTER");
							}}
						/>
					</>
				);
			}}
		</Modal>
	),
	REGISTER: (
		<Modal status="REGISTER">
			{({ onStatusChange }) => {
				return (
					<>
						<PageForm
							status="REGISTER"
							onLoginToggle={() => {
								onStatusChange("LOGIN");
							}}
							onClose={() => {
								onStatusChange(null);
							}}
						/>
					</>
				);
			}}
		</Modal>
	),
};
