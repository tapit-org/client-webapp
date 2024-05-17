import { FC, useState } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import Prices from "components/Prices";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import toast from "react-hot-toast";
import ProductTag from "components/ProductTag";
import { ProductListItemInterface } from "interfaces/product.interface";
import {
	AddShoppingCartOutlined,
	Close,
	ShareOutlined,
} from "@mui/icons-material";
import { addCartItem } from "store/reducers/cart";
import { dispatch } from "store";
import NotifyAddToCart from "components/NotifyAddToCart";
import { FacebookShare, TwitterShare, WhatsappShare } from "react-share-kit";
import { IconButton } from "@mui/material";
export interface ProductCardProps {
	product: ProductListItemInterface;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const productLink = "/product/" + product.id;
	const shareLink = `https://tap-it.in${productLink}`;
	const shareText = "Hey! Checkout this product by Tap-It";
	const [showShareIcons, setShowShareIcons] = useState(false);
	const handleAddToCart = () => {
		const itemToAdd = {
			id: product.id,
			name: product.name,
			category: product.category,
			thumbnail: product.thumbnail,
			price: product.price,
			status: product.status,
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
		<>
			<div
				className="nc-ProductCard relative flex flex-col bg-transparent"
				data-nc-id="ProductCard"
				onMouseLeave={() =>
					setTimeout(() => setShowShareIcons(false), 100)
				}
			>
				<Link to={productLink} className="absolute inset-0"></Link>

				<div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
					<Link to={productLink} className="block">
						<NcImage
							containerClassName="flex aspect-w-12 aspect-h-12 w-full h-0"
							src={product.thumbnail}
							className="object-cover w-full h-full drop-shadow-xl"
						/>
					</Link>
					<ProductTag key={product.tag} tag={product.tag} />
					<div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
						{showShareIcons ? (
							<div className="flex">
								<FacebookShare
									url={shareLink}
									quote={shareText}
									size={40}
									round
									style={{
										marginLeft: 3,
										marginRight: 3,
									}}
								/>
								<TwitterShare
									url={shareLink}
									title={shareText}
									size={40}
									round
									style={{
										marginLeft: 3,
										marginRight: 3,
									}}
								/>
								<WhatsappShare
									url={shareLink}
									title={shareText}
									separator=":: "
									size={40}
									round
									style={{
										marginLeft: 3,
										marginRight: 3,
									}}
								/>
								<IconButton
									onClick={() => setShowShareIcons(false)}
									sx={{
										background: "white",
										marginLeft: 0.5,
										marginRight: 0.5,
										":hover": {
											background: "black",
											color: "white",
										},
									}}
								>
									<Close />
								</IconButton>
							</div>
						) : (
							<div>
								<ButtonPrimary
									className="shadow-lg"
									fontSize="text-xs"
									sizeClass="py-2 px-4"
									onClick={() => handleAddToCart()}
								>
									<AddShoppingCartOutlined fontSize="small" />
									<span className="ml-2">Add to Cart</span>
								</ButtonPrimary>
								<ButtonSecondary
									className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
									fontSize="text-xs"
									sizeClass="py-2 px-4"
									onClick={() => setShowShareIcons(true)}
								>
									<ShareOutlined fontSize="small" />
									<span className="ml-2">Share</span>
								</ButtonSecondary>
							</div>
						)}
					</div>
				</div>

				<div className="space-y-4 px-2.5 pt-5 pb-2.5">
					<div>
						<h2
							className={`nc-ProductCard__title text-base font-semibold transition-colors`}
						>
							{product.name}
						</h2>
						<p
							className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
						>
							{product.category}
						</p>
					</div>

					<div className="flex justify-between items-end ">
						<Prices price={product.price} />

						<div className="flex items-center mb-0.5">
							<StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
							<span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
								{product.totalRating == 0
									? "No Reviews"
									: `${(
											product.totalRating /
											product.reviewCount
									  ).toString()} · ${product.reviewCount.toString()} Reviews`}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
