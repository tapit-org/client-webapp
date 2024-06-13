import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Box, Stack, Typography } from "@mui/material";
import CartQuantityEditor from "components/ChangeCartQuantity";
import CostTable from "components/CostTable";
import Modal from "components/Modal";
import Prices from "components/Prices";
import { CartItemInterface } from "interfaces/cart.interface";
import LoginModal from "modals/LoginModal";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { dispatch } from "store";
import { removeAllCartItems } from "store/reducers/cart";

const formatAmount = (amount: number) => {
	return "Rs. " + amount.toFixed(2);
};

const Cart = () => {
	const user = useSelector((state: any) => state.user);
	const cart = useSelector((state: any) => state.cart);
	const cartValue = cart
		? cart
				.map(
					(cartItem: CartItemInterface) =>
						cartItem.quantity * cartItem.price,
				)
				.reduce(
					(total: number, currentNumber: number) =>
						total + currentNumber,
					0,
				)
		: 0;
	const shippingCost = cartValue == 0 ? 0 : 100;
	const tax = cartValue == 0 ? 0 : 20;
	const handleRemoveProduct = (id: string) => {
		dispatch(removeAllCartItems(id));
	};
	const renderStatusSoldout = () => {
		return (
			<div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
				<NoSymbolIcon className="w-3.5 h-3.5" />
				<span className="ml-1 leading-none">Sold Out</span>
			</div>
		);
	};

	const renderStatusInstock = () => {
		return (
			<div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
				<CheckIcon className="w-3.5 h-3.5" />
				<span className="ml-1 leading-none">In Stock</span>
			</div>
		);
	};
	const navigate = useNavigate();
	const handleCheckout = () => {
		if (user.uid) {
			navigate("/checkout");
		} else {
			setShowLoginModal(true);
			// toast.error("Please login to checkout!", {
			// 	position: "bottom-right",
			// });
			// localStorage.setItem("next_route", "/checkout");
		}
	};

	const renderProduct = (item: CartItemInterface, index: number) => {
		const { id, name, category, price, quantity, thumbnail } = item;

		return (
			<div
				key={index}
				className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
			>
				<div className="relative h-32 w-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
					<img
						src={thumbnail}
						alt={name}
						className="h-full w-full object-contain object-center"
					/>
					<Link
						to={"/product/" + id}
						className="absolute inset-0"
					></Link>
				</div>

				<div className="ml-3 sm:ml-6 flex flex-1 flex-col">
					<div>
						<div className="flex justify-between ">
							<div className="flex-[1.5] ">
								<div className="flex justify-between w-full relative">
									<div>
										<h3 className="text-base font-semibold">
											<Link to={"/product/" + id}>
												{name}
											</Link>
										</h3>
										<p className="text-xs">
											Category - {category}
										</p>
									</div>
									<Prices
										contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
										price={quantity * price}
									/>
								</div>
								<div className="mt-3 flex justify-between w-full relative">
									<CartQuantityEditor cartItem={item} />
									<a
										onClick={() => handleRemoveProduct(id)}
										href="##"
										className="relative z-10 flex items-center font-medium text-sm "
									>
										<span>Remove</span>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="flex mt-auto pt-4 items-end justify-between text-sm">
						{renderStatusInstock()}
					</div>
				</div>
			</div>
		);
	};
	const [showLoginModal, setShowLoginModal] = useState(false);
	return (
		<div className="nc-Cart">
			<Helmet>
				<title>Your Cart || Tap-it</title>
			</Helmet>
			<LoginModal
				showModal={showLoginModal}
				handleToggleModal={() => setShowLoginModal((prev) => !prev)}
			/>
			{cart.length == 0 ? (
				<Stack
					direction={"column"}
					spacing={2}
					alignItems={"center"}
					justifyContent={"center"}
					sx={{
						height: "50vh",
					}}
				>
					<img
						style={{ height: "250px" }}
						src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
						alt="empty-cart"
					/>
					<Typography variant="h5">Your cart is empty!</Typography>
					<Link to="/products">
						<ButtonPrimary>Start Shopping</ButtonPrimary>
					</Link>
				</Stack>
			) : (
				<main className="container py-16 lg:pb-28 lg:pt-20 ">
					<div className="mb-12 sm:mb-16">
						<h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
							Your Cart
						</h2>
					</div>

					<hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

					<div className="flex flex-col lg:flex-row">
						<div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
							{cart.map(renderProduct)}
						</div>
						<div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
						<div className="flex-1">
							<div className="sticky top-28">
								<CostTable cart={cart} />
								<ButtonPrimary
									onClick={handleCheckout}
									className="mt-8 w-full"
									disabled={cart.length == 0}
								>
									Checkout
								</ButtonPrimary>
								<div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
									<p className="block relative pl-5">
										<svg
											className="w-4 h-4 absolute -left-1 top-0.5"
											viewBox="0 0 24 24"
											fill="none"
										>
											<path
												d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M12 8V13"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M11.9945 16H12.0035"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										Learn more{` `}
										<a
											target="_blank"
											rel="noopener noreferrer"
											href="##"
											className="text-slate-900 dark:text-slate-200 underline font-medium"
										>
											Taxes
										</a>
										<span>
											{` `}and{` `}
										</span>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href="##"
											className="text-slate-900 dark:text-slate-200 underline font-medium"
										>
											Shipping
										</a>
										{` `} infomation
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			)}
		</div>
	);
};

export default Cart;
