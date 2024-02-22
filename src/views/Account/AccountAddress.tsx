import { AddOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import AddressList from "components/AddressList";
import CreateAddressForm from "components/CreateAddressForm";
import { AddressInterface } from "interfaces/address.interface";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAddressList } from "services/address.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "views/Account/CommonLayout";

const AccountAddress = () => {
	const uid = useSelector((state: any) => state.user.uid);
	const [addressList, setAddressList] = useState<AddressInterface[]>();
	const [showLoader, setShowLoader] = useState(true);
	const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
	const createAddressCallback = (createdAddress: AddressInterface) => {
		setAddressList((prev: AddressInterface[]) => [...prev, createdAddress]);
		setShowAddressForm(false);
	};
	useEffect(() => {
		const initAddressList = async () => {
			setShowLoader(true);
			const response = await getAddressList(uid);
			setAddressList(response);
			setShowLoader(false);
		};
		if (uid) {
			initAddressList();
		}
	}, [uid]);
	return (
		<div>
			<CommonLayout>
				<Stack spacing={4}>
					<AddressList
						showLoader={showLoader}
						addressList={addressList || []}
						isSelectable={false}
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
				</Stack>
			</CommonLayout>
		</div>
	);
};

export default AccountAddress;
