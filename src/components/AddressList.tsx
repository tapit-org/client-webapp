import { CircularProgress, Grid, Stack } from "@mui/material";
import { AddressInterface } from "interfaces/address.interface";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { FC } from "react";

const renderAddressString = (
	address: AddressInterface,
	showName: boolean = false,
) => {
	let addressString = "";
	if (address) {
		addressString = `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.country}. ${address.zip}.`;
		if (address.landmark) {
			addressString += ` Near ${address.landmark}`;
		}
		if (showName) {
			addressString = `${address.name} - ${addressString}`;
		}
	}
	return addressString;
};

interface AddressListProps {
	showLoader: boolean;
	addressList: AddressInterface[];
	isSelectable: boolean;
	selected?: AddressInterface;
	onSelect?: (selectedAddress: AddressInterface) => void;
}

const AddressList: FC<AddressListProps> = ({
	showLoader,
	addressList,
	isSelectable,
	selected = null,
	onSelect = (selectedAddress: AddressInterface) => {},
}) => {
	if (showLoader)
		return (
			<Stack alignItems={"center"}>
				<CircularProgress />
			</Stack>
		);
	if (addressList.length == 0) return <Grid>No Saved Addresses</Grid>;
	return (
		<>
			{addressList.map((address: AddressInterface) => (
				<Grid
					className="pb-3 border-b border-slate-200 dark:border-slate-700"
					xs={12}
					spacing={1}
					container
					key={address.name}
				>
					<Grid item xs={isSelectable ? 9 : 12}>
						<h3 className="font-semibold text-slate-700 dark:text-slate-300 flex">
							{address.name}
						</h3>
						<div className="mt-1 text-sm">
							{renderAddressString(address)}
						</div>
					</Grid>
					{isSelectable && (
						<Grid item key={address.name} xs={3}>
							<Stack
								direction={"row"}
								spacing={1}
								alignItems={"center"}
								justifyContent={"flex-end"}
							>
								{selected && selected.name == address.name ? (
									<ButtonPrimary
										disabled
										sizeClass="py-2 px-4"
										fontSize="text-sm font-medium"
										className="bg-slate-50 dark:bg-slate-800 !rounded-lg"
									>
										Selected
									</ButtonPrimary>
								) : (
									<ButtonSecondary
										sizeClass="py-2 px-4"
										fontSize="text-sm font-medium"
										className="bg-slate-50 dark:bg-slate-800 !rounded-lg"
										onClick={() => onSelect(address)}
									>
										Select
									</ButtonSecondary>
								)}
							</Stack>
						</Grid>
					)}
				</Grid>
			))}
		</>
	);
};

export default AddressList;
