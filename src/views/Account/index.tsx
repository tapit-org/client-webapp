import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "views/Account/CommonLayout";
import { Helmet } from "react-helmet-async";
import { avatarImgs } from "contains/fakeData";
import { useSelector } from "react-redux";
import {
	AccountCircleOutlined,
	VerifiedUserOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";

export interface AccountProps {
	className?: string;
}

const Account: FC<AccountProps> = () => {
	const user = useSelector((state: any) => state.user);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [phoneCode, setPhoneCode] = useState(user.phoneCode);
	const [phone, setPhone] = useState(user.phone);
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		if (user) {
			console.log(user);
			setUserData({ ...user });
		}
	}, [user]);
	const handleUpdateUser = () => {};
	if (userData) {
		return (
			<div data-nc-id="Account">
				<Helmet>
					<title>Account | Tap-it</title>
				</Helmet>
				<CommonLayout>
					<div className="space-y-10 sm:space-y-12">
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
									onChange={(e) =>
										setPhoneCode(e.target.value)
									}
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
						<div className="pt-2">
							<ButtonPrimary onClick={handleUpdateUser}>
								Update account
							</ButtonPrimary>
						</div>
					</div>
				</CommonLayout>
			</div>
		);
	}
};

export default Account;
