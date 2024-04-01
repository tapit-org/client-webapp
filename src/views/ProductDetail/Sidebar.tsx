import { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "components/Icons/BagIcon";
import NcInputNumber from "components/NcInputNumber";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Prices from "components/Prices";
import toast from "react-hot-toast";
import NotifyAddToCart from "components/NotifyAddToCart";
import ProductDescription from "./Description";
import { ProductInterface } from "interfaces/product.interface";
import { dispatch } from "store";
import { addCartItem } from "store/reducers/cart";

export interface SidebarPageProps {
	product: ProductInterface;
}

const Sidebar: FC<SidebarPageProps> = ({ product }) => {
	const [qualitySelected, setQualitySelected] = useState(1);
	const handleAddToCart = () => {
		const itemToAdd = {
			id: product.id,
			name: product.name,
			category: product.category,
			thumbnail: product.thumbnail,
			price: product.price,
			status: product.status,
			quantity: qualitySelected,
		};
		dispatch(addCartItem(itemToAdd));
		notifyAddTocart();
	};
	const notifyAddTocart = () => {
		toast.custom((t) => <NotifyAddToCart product={product} />, {
			position: "top-center",
			id: "nc-product-notify",
			duration: 2000,
		});
	};

	return (
		<div className="space-y-7 2xl:space-y-8">
			{/* ---------- 1 HEADING ----------  */}
			<div>
				<h2 className="text-2xl sm:text-3xl font-semibold">
					{product.name}
				</h2>

				<div className="flex items-center mt-5 space-x-4 sm:space-x-5">
					{/* <div className="flex text-xl font-semibold">$112.00</div> */}
					<Prices
						contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
						price={product.price}
					/>

					<div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

					<div className="flex items-center">
						<a
							href="#reviews"
							className="flex items-center text-sm font-medium"
						>
							<StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
							<div className="ml-1.5 flex">
								{product.totalRating == 0
									? "No Reviews"
									: `${(
											product.totalRating /
											product.reviewCount
									  ).toString()} · ${product.reviewCount.toString()} Reviews`}
							</div>
						</a>
						<span className="hidden sm:block mx-2.5">·</span>
						<div className="hidden sm:flex items-center text-sm">
							<SparklesIcon className="w-3.5 h-3.5" />
							<span className="ml-1 leading-none">
								{product.tag}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
			<div className="flex space-x-3.5">
				<div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
					<NcInputNumber
						className="relative z-10"
						value={qualitySelected}
						handleIncrement={() =>
							setQualitySelected((quantity) => quantity + 1)
						}
						handleDecrement={() =>
							setQualitySelected((quantity) => quantity - 1)
						}
					/>
				</div>
				<ButtonPrimary
					className="flex-1 flex-shrink-0"
					onClick={handleAddToCart}
				>
					<BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
					<span className="ml-3">Add to cart</span>
				</ButtonPrimary>
			</div>

			<ProductDescription
				description={product.description}
				features={product.features}
			/>
		</div>
	);
};

export default Sidebar;
