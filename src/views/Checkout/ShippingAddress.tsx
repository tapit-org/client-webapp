import {
	AddOutlined,
	ClearOutlined,
	DoneAllOutlined,
	HomeOutlined,
} from "@mui/icons-material";
import { CircularProgress, Grid, Stack } from "@mui/material";
import { AddressInterface } from "interfaces/address.interface";
import { CheckoutUserInterface } from "interfaces/user.interface";
import { FC, useEffect, useMemo, useState } from "react";
import { getAddressList } from "services/address.service";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CreateAddressForm from "../../components/CreateAddressForm";
import { handleVerifyAddress } from "services/checkout.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import AddressList from "components/AddressList";

interface Props {
	checkoutUser: CheckoutUserInterface;
	setCheckoutUser: any;
}

const ShippingAddress: FC<Props> = ({ checkoutUser, setCheckoutUser }) => {
	const [addressList, setAddressList] = useState(null);
	const [showLoader, setShowLoader] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const valid = useMemo(() => {
		return handleVerifyAddress(checkoutUser.shippingAddress);
	}, [checkoutUser]);
	useEffect(() => {
		(async () => {
			setShowLoader(true);
			const response = await getAddressList(checkoutUser.uid);
			setAddressList(response);
			if (response.length != 0) handleSetShippingAddress(response[0]);
			setShowLoader(false);
		})();
	}, []);

	const handleSetShippingAddress = (address: AddressInterface) => {
		setCheckoutUser((checkoutUser: CheckoutUserInterface) => {
			return {
				...checkoutUser,
				shippingAddress: address,
			};
		});
	};
	const createAddressCallback = (createdAddress: AddressInterface) => {
		setAddressList((prev: AddressInterface[]) => [...prev, createdAddress]);
		handleSetShippingAddress(createdAddress);
		setShowAddressForm(false);
	};
	return (
		<div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
			<Grid container spacing={1} className="p-6">
				<Grid item>
					<Stack direction={"row"} alignItems={"center"}>
						<HomeOutlined fontSize="large" />
						<div>
							<h3 className="text-slate-700 dark:text-slate-300 flex">
								<span className="uppercase mx-4">
									SHIPPING ADDRESS
								</span>
							</h3>
						</div>
					</Stack>
				</Grid>
			</Grid>
			<div
				className={
					"border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6"
				}
			>
				<AddressList
					showLoader={showLoader}
					addressList={addressList || []}
					isSelectable={true}
					selected={checkoutUser.shippingAddress}
					onSelect={handleSetShippingAddress}
				/>

				{showAddressForm ? (
					<CreateAddressForm
						callback={createAddressCallback}
						hide={() => setShowAddressForm(false)}
					/>
				) : (
					<ButtonSecondary
						sizeClass="py-2 px-4"
						fontSize="text-sm font-medium"
						className="bg-slate-50 dark:bg-slate-800 !rounded-lg"
						onClick={() => setShowAddressForm(true)}
					>
						<span className="mr-2">Add Address</span>{" "}
						<AddOutlined fontSize="small" />
					</ButtonSecondary>
				)}
			</div>
		</div>
	);
};

export default ShippingAddress;
