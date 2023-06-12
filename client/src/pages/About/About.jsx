import { Typography, Container, List, ListItem } from "@mui/material";
import React from "react";

const About = () => {
	return (
		<Container>
			<Typography variant="h5">
				Магазин електроніки Mobile Galaxy – максимум можливостей.
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
			>
				Mobile Galaxy – це найсучасніший магазин електроніки та аксесуарів в Україні. Сучасний
				формат, миттєве обслуговування клієнтів дозволили компанії швидко завоювати довіру на ринку
				гаджетів та електронних девайсів. Сьогодні в Україні понад 60 магазинів мережі, в яких
				представлені топові моделі смартфонів.
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
			>
				Ми працюємо в двох напрямках – інтернет-магазин розумних гаджетів та мережа
				оффлайн-магазинів. Це можливість побачити товар, вивчити характеристики потрібного гаджета.
				Або заощадити час: купити в інтернеті.
			</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				align="justify"
				pb={5}
			>
				Для кожного клієнта створена зручна можливість покупки на сайті, яка дозволяє забрати
				техніку в обраному магазині або отримати замовлення з курьером.
			</Typography>
			<Typography variant="h5">Асортимент інтернет-магазину Mobile Galaxy.</Typography>
			<Typography
				variant="subtitle2"
				fontWeight="fontWeightRegular"
				fontFamily="Open Sans, sans-serif"
				color="grey.main"
				pb={5}
				align="justify"
			>
				Cмартфони, мобільні телефони – від простих пристроїв до нових прогресивних моделей;
			</Typography>
			<Typography variant="h5">Повний перелік послуг магазину гаджетів Mobile Galaxy.</Typography>
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
					Широка мережа торгових точок. Реалізовано відкритий доступ до товарів, інтерактивні зони
					віртуальної реальності, зони smart-пристроїв, електротранспорту – це дає можливість
					детально вивчити товар.
				</ListItem>
				<ListItem divider={true}>
					Зручний сайт. Інтуїтивно зрозумілий пошук, інформативні фото, докладні описи,
					характеристики – максимально приємний інтернет-шопінг!
				</ListItem>
				<ListItem divider={true}>
					Доставка. Доставляємо товари по всій території України – Миколаїв, Харків, Полтава,
					Херсон, Чернівці, інші міста. Передбачена безкоштовна доставка курєром в Київ та Одесу.
					Мережа оффлайн-магазинів постійно зростає, що дозволяє забрати товар з найближчої до
					вашого будинку точки.
				</ListItem>
				<ListItem divider={true}>
					Оригінальні товари з гарантією. Гаджети перевірених виробників, які підтверджують заявлену
					якість своїх девайсів, завоювали довіру користувачів.
				</ListItem>
			</List>
		</Container>
	);
};

export default About;
