import CostTable from "components/CostTable";
import { CartItemInterface } from "interfaces/cart.interface";
import { CheckoutItemInterface } from "interfaces/checkout.interface";
import { CheckoutUserInterface } from "interfaces/user.interface";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ContactInfo from "views/Checkout/ContactInfo";
import ShippingAddress from "views/Checkout/ShippingAddress";
import CheckoutProduct from "./CheckoutProduct";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import {
	Box,
	IconButton,
	Modal,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { handleShowErrorToast } from "services/notification.service";
import {
	handleVerifyAddress,
	handleVerifyCheckoutItems,
	handleVerifyContactDetails,
	createOrder,
} from "services/checkout.service";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { getProfileCardList } from "services/profile.service";
import { ProfileListItemInterface } from "interfaces/profile.interface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "store/reducers/cart";
const ModalStyles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};
const CheckoutPage = () => {
	const navigate = useNavigate();
	const user = useSelector((state: any) => state.user);
	const cart = useSelector((state: any) => state.cart);
	const shippingCost = 100;
	const tax = 20;
	const [checkoutUser, setCheckoutUser] =
		useState<CheckoutUserInterface>(null);
	const [checkoutItems, setCheckoutItems] = useState<CheckoutItemInterface[]>(
		[],
	);
	const [profileList, setProfileList] = useState<ProfileListItemInterface[]>(
		[],
	);
	const handleSetProfileName = (changeIndex: number, profileId: string) => {
		console.log(profileId);
		setCheckoutItems((prev: CheckoutItemInterface[]) => {
			return prev.map((item: CheckoutItemInterface, index: number) => {
				if (index == changeIndex) {
					return { ...item, profileId };
				}
				return item;
			});
		});
	};
	useEffect(() => {
		if (user.uid) {
			setCheckoutUser({
				...user,
				shippingAddress: null,
			});
			(async () => {
				setProfileList(await getProfileCardList(user.uid));
			})();
		}
	}, [user]);
	useEffect(() => {
		if (cart) {
			let items = [];
			cart.forEach((cartItem: CartItemInterface) => {
				for (let i = 0; i < cartItem.quantity; i++) {
					let checkoutItem = { ...cartItem, profileId: "" };
					delete checkoutItem["quantity"];
					items.push(checkoutItem);
				}
			});
			setCheckoutItems(items);
		}
	}, [cart]);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const handleOpenConfirmationModal = () => setConfirmationModalOpen(true);
	const handleCloseConfirmationModal = () => setConfirmationModalOpen(false);
	const [tabActive, setTabActive] = useState<
		"ContactInfo" | "ShippingAddress" | ""
	>("ContactInfo");
	const handleShowOrderConfimration = () => {
		if (
			!handleVerifyContactDetails(
				checkoutUser.email,
				checkoutUser.phone,
				checkoutUser.phoneCode,
			)
		) {
			handleShowErrorToast("Please enter all contact details.");
			return;
		}
		if (!handleVerifyAddress(checkoutUser.shippingAddress)) {
			handleShowErrorToast("Please verify shipping address details.");
			return;
		}
		// if (!handleVerifyCheckoutItems(checkoutItems)) {
		// 	handleShowErrorToast(
		// 		"Please make sure you have selected profiles for each of your products.",
		// 	);
		// 	return;
		// }
		handleOpenConfirmationModal();
	};
	const dispatch = useDispatch();
	const handleCreateOrder = async () => {
		const response = await createOrder(
			checkoutUser,
			checkoutItems,
			shippingCost,
			tax,
		);
		console.log(response);
		dispatch(emptyCart());
		navigate("/orders");

		// navigate("/order/");
	};
	return (
		<div className="nc-CheckoutPage">
			<Helmet>
				<title>Checkout || Ciseco Ecommerce Template</title>
			</Helmet>

			<main className="container py-16 lg:pb-28 lg:pt-20 ">
				<div className="mb-16">
					<h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
						Checkout
					</h2>
				</div>

				<div className="flex flex-col lg:flex-row">
					<div className="flex-1">
						{checkoutUser && (
							<div className="space-y-8">
								<ContactInfo
									checkoutUser={checkoutUser}
									setCheckoutUser={setCheckoutUser}
								/>

								<ShippingAddress
									checkoutUser={checkoutUser}
									setCheckoutUser={setCheckoutUser}
								/>
							</div>
						)}
					</div>

					<div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

					<div className="w-full lg:w-[36%] ">
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<h3 className="text-lg font-semibold">
								Link your profiles
							</h3>
							<ButtonSecondary
								sizeClass="py-2 px-4"
								fontSize="text-sm font-medium"
								className="bg-slate-50 dark:bg-slate-800 !rounded-lg"
								onClick={() => {}}
							>
								Create New Profile
							</ButtonSecondary>
						</Stack>
						<div className="my-8 ">
							{checkoutItems.map(
								(
									checkoutItem: CheckoutItemInterface,
									index: number,
								) => {
									return (
										<CheckoutProduct
											key={index}
											checkoutItem={checkoutItem}
											checkoutItemIndex={index}
											handleSetProfileName={
												handleSetProfileName
											}
											profileList={profileList}
											setProfileList={setProfileList}
										/>
									);
								},
							)}
							<Typography variant="subtitle2">
								Our team will reach out to you for other
								customizable detials of the cards.
							</Typography>
						</div>
						<div className="py-6 border-t">
							<div className="mb-4">
								<Label className="text-sm">Discount code</Label>
								<div className="flex mt-1.5">
									<Input
										sizeClass="h-10 px-4 py-3"
										className="flex-1"
									/>
									<button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
										Apply
									</button>
								</div>
							</div>
							<CostTable
								cart={cart}
								shippingCost={shippingCost}
								tax={tax}
							/>
							<ButtonPrimary
								onClick={handleShowOrderConfimration}
								className="mt-8 w-full"
							>
								Place Order
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
				<Modal
					open={confirmationModalOpen}
					onClose={handleCloseConfirmationModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={ModalStyles}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							Confirm Order
						</Typography>
						<Typography sx={{ mt: 2, mb: 1 }}>
							Your order will be registered with our team.
						</Typography>
						<Typography>
							We don't support online payments yet, our
							representatives will reach out to you through the
							contact information you have provided for the
							further process.
						</Typography>
						<Stack spacing={2} sx={{ mt: 4 }} direction={"row"}>
							<ButtonPrimary
								className="w-100"
								onClick={handleCreateOrder}
							>
								Confirm
							</ButtonPrimary>
							<ButtonSecondary
								onClick={handleCloseConfirmationModal}
							>
								Close
							</ButtonSecondary>
						</Stack>
					</Box>
				</Modal>
			</main>
		</div>
	);
};

export default CheckoutPage;
