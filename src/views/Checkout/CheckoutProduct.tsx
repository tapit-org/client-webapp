import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box,
	Modal,
} from "@mui/material";
import Prices from "components/Prices";
import { CheckoutItemInterface } from "interfaces/checkout.interface";
import { ProfileListItemInterface } from "interfaces/profile.interface";
import { FC, useState } from "react";
import CreateProfile from "views/Profile/CreateProfile";

interface CheckoutProductProps {
	checkoutItem: CheckoutItemInterface;
	checkoutItemIndex: number;
	profileList: ProfileListItemInterface[];
	setProfileList: any;
	handleSetProfileId: (checkoutItemIndex: number, id: string) => void;
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
	handleSetProfileId,
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
												handleSetProfileId(
													checkoutItemIndex,
													e.target.value,
												)
											}
										>
											{profileList.map((profile) => (
												<MenuItem
													key={profile.id}
													value={profile.id}
													sx={{ fontSize: "0.9em" }}
												>
													{profile.id}
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
							handleSetProfileId(
								checkoutItemIndex,
								createdProfile.id,
							);
						}}
					/>
				</Box>
			</Modal>
		</div>
	);
};

export default CheckoutProduct;
