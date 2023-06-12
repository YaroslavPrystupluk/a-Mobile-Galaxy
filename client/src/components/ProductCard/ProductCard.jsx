import React from "react";
import { Typography } from "@mui/material";
import ProductImageBox from "./components/ProductImageBox";
import ProductDescription from "./components/ProductDescription";
import ProductPrice from "../ProductPrice";
import ToCartButton from "../ToCartButton";
import FavoriteHeartIcon from "../FavoriteHeartIcon";
import ProductFlag from "./components/ProductFlag";
// eslint-disable-next-line import/named
import { ProductCardWrapper, Inactive } from "./styled";
import { InactiveTextPopProd } from "./components/InactiveText/InactiveTextPopProd";
import { InactiveTextCataloge } from "./components/InactiveText/InactiveTextCataloge";

const ProductCard = ({ card, withCart = true, priceColor, setNotification }) => {
	const {
		name,
		currentPrice,
		previousPrice,
		newItem,
		_id,
		itemNo,
		sale,
		brand,
		imageUrls,
		color,
		quantity,
	} = card;
	return (
		<>
			{!quantity ? (
				<Inactive>
					<ProductCardWrapper id={itemNo}>
						<ProductFlag sale={sale} newItem={newItem} />
						<ProductImageBox
							image={imageUrls[0]}
							brand={brand}
							sale={sale}
							newItem={newItem}
							id={itemNo}
						/>
						<ProductDescription name={name} color={color} />
						<ProductPrice
							id={itemNo}
							priceColor={priceColor}
							currentPrice={currentPrice}
							previousPrice={previousPrice}
						/>
						{withCart ? <InactiveTextCataloge /> : <InactiveTextPopProd />}
						<FavoriteHeartIcon id={_id} />
					</ProductCardWrapper>
				</Inactive>
			) : (
				<ProductCardWrapper id={itemNo}>
					<ProductFlag sale={sale} newItem={newItem} />
					<ProductImageBox
						image={imageUrls[0]}
						brand={brand}
						sale={sale}
						newItem={newItem}
						id={itemNo}
					/>
					<ProductDescription name={name} color={color} />
					<ProductPrice
						id={itemNo}
						priceColor={priceColor}
						currentPrice={currentPrice}
						previousPrice={previousPrice}
					/>
					{withCart && <ToCartButton id={_id} setNotification={setNotification} />}
					<FavoriteHeartIcon id={_id} />
				</ProductCardWrapper>
			)}
		</>
	);
};
export default ProductCard;
