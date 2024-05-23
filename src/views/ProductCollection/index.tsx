import { Helmet } from "react-helmet-async";
import ProductCard from "components/ProductCard";
import { PRODUCTS } from "data/data";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import TabFilters from "components/TabFilters";
import ProductList from "components/ProductList";
import { useEffect, useState } from "react";
import { ProductListItemInterface } from "interfaces/product.interface";
import { getProductList } from "services/product.service";
import { CircularProgress, Stack } from "@mui/material";

const ProductCollection = () => {
	const [showLoader, setShowLoader] = useState(false);
	const [filters, setFilters] = useState(null);

	const handleUpdateFiltersByKey = (key: string, newValue: any) => {
		setFilters((prev) => {
			return {
				...prev,
				[key]: newValue,
			};
		});
	};
	return (
		<div data-nc-id="ProductCollection">
			<Helmet>
				<title>Products | Tap-it</title>
			</Helmet>
			<div
				className={`nc-HeadBackgroundCommon  top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
				data-nc-id="HeadBackgroundCommon"
			>
				<div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
					<div className="space-y-10 lg:space-y-14">
						{/* HEADING */}
						<div className="max-w-screen-sm">
							<h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
								Products
							</h2>
							<span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
								We not only help you design exceptional
								products, but also make it easy for you to share
								your designs with more like-minded people.
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="container">
				<header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
					<form
						className="relative w-full"
						onSubmit={(e) => e.preventDefault()}
					>
						<label
							htmlFor="search-input"
							className="text-neutral-500 dark:text-neutral-300"
						>
							<span className="sr-only">Search all icons</span>
							<Input
								className="shadow-lg border-0 dark:border"
								id="search-input"
								type="search"
								placeholder="Type your keywords"
								sizeClass="pl-14 py-5 pr-5 md:pl-16"
								rounded="rounded-full"
							/>
							<ButtonCircle
								className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
								size=" w-11 h-11"
								type="submit"
							>
								<i className="las la-arrow-right text-xl"></i>
							</ButtonCircle>
							<span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
								<svg
									className="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M22 22L20 20"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</label>
					</form>
				</header>
			</div> */}
			<div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
				<div className="space-y-10 lg:space-y-14">
					<main>
						{/* {filters && (
							<TabFilters
								filters={filters}
								handleUpdateFiltersByKey={
									handleUpdateFiltersByKey
								}
							/>
						)} */}

						<div className="my-5">
							{showLoader ? (
								<Stack
									className="w-100 py-5"
									alignItems={"center"}
									justifyContent={"center"}
								>
									<CircularProgress />
								</Stack>
							) : (
								<ProductList
									filters={filters}
									handleInitFilters={(newFilters) =>
										setFilters(newFilters)
									}
								/>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default ProductCollection;
