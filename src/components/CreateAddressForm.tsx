import { Box, Grid, Stack, Typography, Modal } from "@mui/material";
import Label from "components/Label/Label";
import { AddressInterface } from "interfaces/address.interface";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { createAddress } from "services/address.service";
import { handleVerifyAddress } from "services/checkout.service";
import {
	handleShowErrorToast,
	handleShowSuccessToast,
} from "services/notification.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";

interface CreateAddressFormProps {
	callback: (createdAddress: AddressInterface) => void;
	hide: () => void;
}

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
const CreateAddressForm: FC<CreateAddressFormProps> = ({ callback, hide }) => {
	const uid = useSelector((state: any) => state.user.uid);
	const [showLoader, setShowLoader] = useState(false);
	const [newAddress, setNewAddress] = useState<AddressInterface>({
		name: "",
		line1: "",
		line2: "",
		city: "",
		state: "",
		country: "",
		zip: "",
	});

	const handleCreateAddress = async () => {
		if (!handleVerifyAddress(newAddress)) {
			handleShowErrorToast("Please check address information");
			return;
		}
		if (!newAddress.name || newAddress.name == "") {
			handleShowErrorToast("Please enter address name");
			return;
		}
		setShowLoader(true);
		const response = await createAddress(newAddress);
		console.log(response);
		if (response.status == 400) {
			handleShowErrorToast(response.data);
		} else if (response.status == 201) {
			handleShowSuccessToast(response.data);
			callback(newAddress);
		}
		setShowLoader(false);
		handleCloseNameModal();
	};
	const [showNameModal, setShowNameModal] = useState(false);
	const handleOpenNameModal = () => {
		if (!handleVerifyAddress(newAddress)) {
			handleShowErrorToast("Please check address information");
			return;
		}
		setShowNameModal(true);
	};
	const handleCloseNameModal = () => setShowNameModal(false);
	return (
		<Stack spacing={2}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Label className="text-sm">Address Line 1</Label>
					<Input
						className="mt-1.5"
						value={newAddress.line1}
						onChange={(e) =>
							setNewAddress({
								...newAddress,
								line1: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<Label className="text-sm">Address Line 2</Label>
					<Input
						className="mt-1.5"
						value={newAddress.line2}
						onChange={(e) =>
							setNewAddress({
								...newAddress,
								line2: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Label className="text-sm">City</Label>
					<Input
						className="mt-1.5"
						value={newAddress.city}
						onChange={(e) =>
							setNewAddress({
								...newAddress,
								city: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Label className="text-sm">State</Label>
					<Input
						className="mt-1.5"
						value={newAddress.state}
						onChange={(e) =>
							setNewAddress({
								...newAddress,
								state: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Label className="text-sm">Country</Label>
					<Input
						className="mt-1.5"
						value={newAddress.country}
						onChange={(e) =>
							setNewAddress({
								...newAddress,
								country: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Label className="text-sm">Zip Code</Label>
					<Input
						className="mt-1.5"
						value={newAddress.zip}
						onChange={(e) =>
							setNewAddress({
								...newAddress,
								zip: e.target.value,
							})
						}
					/>
				</Grid>
			</Grid>
			<Stack direction={"row"} spacing={2}>
				<ButtonPrimary
					className="sm:!px-7 shadow-none"
					onClick={handleOpenNameModal}
				>
					Create
				</ButtonPrimary>
				<ButtonSecondary
					className="sm:!px-7 shadow-none"
					onClick={hide}
				>
					Close
				</ButtonSecondary>
			</Stack>
			<Modal
				open={showNameModal}
				onClose={handleCloseNameModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={ModalStyles}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Let's give your new address a name
					</Typography>
					<Grid item xs={12} sm={6}>
						<Input
							placeholder="Eg. My Home"
							className="mt-3"
							value={newAddress.name}
							onChange={(e) =>
								setNewAddress({
									...newAddress,
									name: e.target.value,
								})
							}
						/>
					</Grid>
					<Stack spacing={2} sx={{ mt: 4 }} direction={"row"}>
						<ButtonPrimary
							className="w-100"
							onClick={handleCreateAddress}
							loading={showLoader}
						>
							Confirm
						</ButtonPrimary>
						<ButtonSecondary onClick={handleCloseNameModal}>
							Close
						</ButtonSecondary>
					</Stack>
				</Box>
			</Modal>
		</Stack>
	);
};

export default CreateAddressForm;
