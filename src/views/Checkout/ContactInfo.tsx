import {
	AccountCircleOutlined,
	ClearOutlined,
	DoneAllOutlined,
} from "@mui/icons-material";
import { Grid, Stack } from "@mui/material";
import Label from "components/Label/Label";
import { CheckoutUserInterface } from "interfaces/user.interface";
import { FC, useEffect, useMemo, useState } from "react";
import { handleVerifyContactDetails } from "services/checkout.service";
import { handleShowErrorToast } from "services/notification.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";

interface Props {
	checkoutUser: CheckoutUserInterface;
	setCheckoutUser: any;
}

const ContactInfo: FC<Props> = ({ checkoutUser, setCheckoutUser }) => {
	const [name, setName] = useState(checkoutUser.name);
	const [email, setEmail] = useState(checkoutUser.email);
	const [phoneCode, setPhoneCode] = useState(checkoutUser.phoneCode || "91");
	const [phone, setPhone] = useState(checkoutUser.phone || "7704080026");
	const valid = useMemo(() => {
		return handleVerifyContactDetails(email, phone, phoneCode);
	}, [checkoutUser]);
	useEffect(() => {
		setCheckoutUser((checkoutUser: CheckoutUserInterface) => {
			return { ...checkoutUser, email, phone, phoneCode };
		});
	}, [email, phone, phoneCode]);
	const renderAccount = () => {
		return (
			<div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
				<Grid container spacing={1} className="p-6">
					<Grid item xs={12} sm={8}>
						<Stack direction={"row"} alignItems={"center"}>
							<AccountCircleOutlined fontSize="large" />
							<div>
								<h3 className="text-slate-700 dark:text-slate-300 flex">
									<span className="uppercase tracking-tight mx-4">
										CONTACT INFO
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
					<div className="flex justify-between flex-wrap items-baseline">
						<h3 className="text-lg font-semibold">
							Contact infomation
						</h3>
					</div>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Label className="text-sm">Name</Label>
							<Input
								className="mt-1.5"
								type={"text"}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Label className="text-sm">Email Address</Label>
							<Input
								className="mt-1.5"
								type={"email"}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<Label className="text-sm">Phone Code</Label>
							<Input
								className="mt-1.5"
								type={"tel"}
								value={phoneCode}
								onChange={(e) => setPhoneCode(e.target.value)}
							/>
						</Grid>
						<Grid item xs={9}>
							<Label className="text-sm">Phone Number</Label>
							<Input
								className="mt-1.5"
								type={"tel"}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	};

	return renderAccount();
};

export default ContactInfo;
