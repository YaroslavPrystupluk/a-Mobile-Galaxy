import React from "react";
import { Typography, Container, List, ListItem } from "@mui/material";

const ExchangeAndReturn = () => {
	return (
		<Container>
			<Typography variant="h5">Я можу обміняти товар або повернути товар.</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
			>
				Так, ви можете обміняти або повернути товар протягом 14 днів з моменту покупки. Це право
				гарантує вам «Закон про захист прав споживачів».
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
			>
				Щоб скористатися цією можливістю обміну чи повернення товару належної якості будь ласка,
				переконайтеся що:
			</Typography>
			<List
				sx={{
					color: "grey.main",
					fontFamily: "Open Sans, sans-serif",
					fontSize: "14px",
					fontWeight: "fontWeightRegular",
					padding: "0 0 40px 0",
				}}
			>
				<ListItem divider={true}>
					Товар, не був у вжитку і не має слідів використання: подряпин, сколів, програмне
					забезпечення не піддавалося змінам і т. д .
				</ListItem>
				<ListItem divider={true}>
					Товар повністю укомплектований і не порушена цілісність упаковкию
				</ListItem>
				<ListItem divider={true}>Збережені всі ярлики і заводське маркування.</ListItem>
			</List>

			<Typography variant="h5">Де і як можна зробити обмін або повернення товару?</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
				pb={2}
			>
				Обміняти або повернути товар можна в магазині нашої мережі в якому ви придбали Товар.
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
				pb={2}
			>
				При собі вам потрібно мати товар, упаковку і комплектуючі до нього, гарантійний талон і
				товарний чек.
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				pb={5}
				align="justify"
			>
				Якщо ви перебуваєте в іншому місті, де немає нашого магазину, товар необхідно відправити
				«Новою Поштою». Подробиці пересилання уточнюйте за тел .: (096) 166-64-16. Умови обміну або
				повернення товару вказані вище.
			</Typography>
		</Container>
	);
};

export default ExchangeAndReturn;
