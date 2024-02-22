import { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import { ProductListItemInterface } from "interfaces/product.interface";
import { getProductList } from "services/product.service";
import ProductSlider from "./ProductSlider";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

export interface ProductListProps {
	heading?: string;
	subHeading?: string;
	type?: "LIST" | "SLIDER";
}

const renderProductList = (
	productList: ProductListItemInterface[],
	type: string,
) => {
	if (productList) {
		if (productList.length == 0)
			return (
				<Typography variant="h5">
					No products available at the moment
				</Typography>
			);
		if (type == "SLIDER") {
			return <ProductSlider data={productList} />;
		} else {
			return (
				<Grid container spacing={3}>
					{productList.map((product) => {
						return (
							<Grid item xs={12} md={6} lg={4} key={product.id}>
								<ProductCard product={product} />
							</Grid>
						);
					})}
				</Grid>
			);
		}
	}
};

const ProductList: FC<ProductListProps> = ({
	heading,
	subHeading,
	type = "LIST",
}) => {
	const [productList, setProductList] =
		useState<ProductListItemInterface[]>(null);
	const [showLoader, setShowLoader] = useState(false);
	useEffect(() => {
		(async () => {
			setShowLoader(true);
			setProductList(await getProductList());
			setShowLoader(false);
		})();
	}, []);
	return (
		<div>
			{heading && (
				<Heading
					rightDescText={subHeading}
					hasNextPrev={false}
					isCenter
				>
					{heading}
				</Heading>
			)}
			{showLoader ? (
				<Stack
					className="w-100 py-5"
					alignItems={"center"}
					justifyContent={"center"}
				>
					<CircularProgress />
				</Stack>
			) : (
				renderProductList(productList, type)
			)}
		</div>
	);
};

export default ProductList;
