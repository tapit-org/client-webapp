import {
	AddCircleOutlineOutlined,
	AlternateEmailOutlined,
	Label,
} from "@mui/icons-material";
import {
	FormControl,
	Stack,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	IconButton,
	Tooltip,
	Box,
	Grid,
	Modal,
} from "@mui/material";
import Heading from "components/Heading/Heading";
import Prices from "components/Prices";
import { CheckoutItemInterface } from "interfaces/checkout.interface";
import {
	PROFILE_THEMES,
	ProfileListItemInterface,
} from "interfaces/profile.interface";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { createProfile } from "services/profile.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import CreateProfile from "views/Profile/CreateProfile";

interface CheckoutProductProps {
	checkoutItem: CheckoutItemInterface;
	checkoutItemIndex: number;
	profileList: ProfileListItemInterface[];
	setProfileList: any;
	handleSetProfileName: (checkoutItemIndex: number, value: string) => void;
}
const ModalStyles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	maxWidth: "90%",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};
const CheckoutProduct: FC<CheckoutProductProps> = ({
	checkoutItem,
	checkoutItemIndex,
	profileList,
	setProfileList,
	handleSetProfileName,
}) => {
	const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
	const handleCloseCreateProfileModal = () =>
		setShowCreateProfileModal((prev) => !prev);
	return (
		<div
			key={checkoutItemIndex}
			className="relative flex py-4 first:pt-0 last:pb-2"
		>
			<div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
				<img
					src={checkoutItem.thumbnail}
					alt={checkoutItem.name}
					className="h-full w-full object-contain object-center"
				/>
			</div>

			<div className="ml-3 sm:ml-6 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between ">
						<div className="flex-[1.5] ">
							<h3 className="text-base font-semibold">
								{checkoutItem.name}
							</h3>
							<div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
								<div className="flex items-center space-x-1.5 w-100">
									<FormControl fullWidth size="small">
										<InputLabel
											sx={{ fontSize: "0.9em" }}
											id="demo-simple-select-label"
										>
											Select Profile
										</InputLabel>
										<Select
											sx={{ fontSize: "0.9em" }}
											className="p-0"
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={checkoutItem.profileId}
											label="Age"
											onChange={(e) =>
												handleSetProfileName(
													checkoutItemIndex,
													e.target.value,
												)
											}
										>
											{profileList.map((profile) => (
												<MenuItem
													key={profile.profileId}
													value={profile.profileId}
													sx={{ fontSize: "0.9em" }}
												>
													{profile.profileId}
												</MenuItem>
											))}
											<MenuItem
												onClick={
													handleCloseCreateProfileModal
												}
												sx={{ fontSize: "0.9em" }}
											>
												Create New
											</MenuItem>
										</Select>
									</FormControl>
								</div>
							</div>
						</div>

						<div className="flex-1 flex justify-end">
							<Prices
								price={checkoutItem.price}
								className="mt-0.5"
							/>
						</div>
					</div>
				</div>
			</div>
			<Modal
				open={showCreateProfileModal}
				onClose={handleCloseCreateProfileModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={ModalStyles}>
					<CreateProfile
						callback={(
							createdProfile: ProfileListItemInterface,
						) => {
							setProfileList(
								(prev: ProfileListItemInterface[]) => [
									...prev,
									createdProfile,
								],
							);
							handleCloseCreateProfileModal();
							handleSetProfileName(
								checkoutItemIndex,
								createdProfile.profileId,
							);
							console.log(createProfile);
						}}
					/>
				</Box>
			</Modal>
		</div>
	);
};

export default CheckoutProduct;
